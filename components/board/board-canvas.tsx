'use client'

import { useCallback, useState, useMemo } from 'react'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'

import { useHistory, useCanUndo, useCanRedo, useMutation, useStorage, useOthersMapped } from '@/liveblocks.config'

import { CanvasState, CanvasMode, Camera, Color, LayerType, Point, Side, XYWH } from '@/euka-core/types/canvas'
import { EukaDrawBoard } from '@/euka-core'
import { MAX_LAYERS } from '@/euka-core/settings'
import { pointerEventToCanvasPoint, resizeBounds } from '@/euka-core/_utils'

import { InfoPanel } from './info-panel'
import { ToolbarPanel } from './toolbar-panel'
import { ParticipantsPanel } from './participants-panel'
import { GenColors } from '@/lib/utils'

interface BoardCanvasProps {
    boardId: string
}

export const BoardCanvas = ({ boardId }: BoardCanvasProps) => {
    const layerIds = useStorage(root => root.layerIds)

    // 画板状态
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    })
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
    const [lastUsedColor, setlastUsedColor] = useState<Color>({ r: 0, g: 0, b: 0 })

    // 画板-操作记录
    const history = useHistory()
    const canUndo = useCanUndo()
    const canRedo = useCanRedo()

    // 画板-图层操作
    const insertLayer = useMutation(
        (
            { storage, setMyPresence },
            layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
            position: Point
        ) => {
            const liveLayers = storage.get('layers')

            if (liveLayers && liveLayers.size >= MAX_LAYERS) {
                return
            }

            const liveLayerIds = storage.get('layerIds')
            const layerId = nanoid()
            const layer = new LiveObject({
                type: layerType,
                x: position.x,
                y: position.y,
                height: 100,
                width: 100,
                fill: lastUsedColor,
            })

            liveLayerIds.push(layerId)
            liveLayers.set(layerId, layer)

            setMyPresence(
                {
                    selection: [layerId],
                },
                {
                    addToHistory: true,
                }
            )

            setCanvasState({
                mode: CanvasMode.None,
            })
        },
        [lastUsedColor]
    )

    // 画板-监图层触发手柄位置
    const onResizeHandlePionterDown = useCallback(
        (corner: Side, initialBounds: XYWH) => {
            history.pause()
            setCanvasState({
                mode: CanvasMode.Resizing,
                initialBounds,
                corner,
            })
        },
        [history]
    )

    // 画板-监听选择图层边框调整大小
    const resizeSelectedLayer = useMutation(
        ({ storage, self }, point) => {
            console.log(`resizeSelectedLayer`, point)
            if (canvasState.mode !== CanvasMode.Resizing) {
                return
            }

            const bounds = resizeBounds(canvasState.initialBounds, canvasState.corner, point)

            const liveLayers = storage.get('layers')
            const layer = liveLayers.get(self.presence.selection[0])

            if (layer) {
                layer.update(bounds)
            }
        },
        [canvasState]
    )

    // 画板-监听鼠标滚轮变化
    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera(camera => {
            const { x, y } = camera
            return {
                x: x - e.deltaX,
                y: y - e.deltaY,
            }
        })
    }, [])

    // 画板-监听光标移动
    const onPointerMove = useMutation(
        ({ setMyPresence }, e: React.PointerEvent) => {
            e.preventDefault()

            const current = pointerEventToCanvasPoint(e, camera)

            // 以动边框调整大小
            if (canvasState.mode === CanvasMode.Resizing) {
                console.log(`onPointerMove_Resizing`, current)
                resizeSelectedLayer(current)
            }

            setMyPresence({
                cursor: current,
            })
        },
        [camera, canvasState, resizeSelectedLayer]
    )

    // 画板-监听光标离开画布
    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({
            cursor: null,
        })
    }, [])

    // 画板-监听光标抬起
    const onPointerUp = useMutation(
        ({}, e: React.PointerEvent) => {
            const point = pointerEventToCanvasPoint(e, camera)
            console.log('onPointerUp', point, canvasState)

            if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point)
            } else {
                setCanvasState({
                    mode: CanvasMode.None,
                })
            }

            // 恢复操作历史记录
            history.resume()
        },
        [camera, canvasState, history, insertLayer]
    )

    // 画板-监听点击选择图层
    const onLayerPointerDown = useMutation(
        ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
            if (canvasState.mode === CanvasMode.Pencil || canvasState.mode === CanvasMode.Inserting) {
                return
            }

            // 不插入操作记录
            history.pause()
            e.stopPropagation()

            const point = pointerEventToCanvasPoint(e, camera)

            if (!self.presence.selection.includes(layerId)) {
                setMyPresence(
                    {
                        selection: [layerId],
                    },
                    {
                        addToHistory: true,
                    }
                )
            }

            setCanvasState({
                mode: CanvasMode.Translating,
                current: point,
            })
        },
        [setCanvasState, camera, history, canvasState.mode]
    )

    // 画板-选择图层元素
    const selections = useOthersMapped(other => other.presence.selection)

    const layerIdsColorsSelection = useMemo(() => {
        const layerIdsToColorSelectionObj: Record<string, string> = {}

        for (const user of selections) {
            const [connectionId, selection] = user

            for (const layerId of selection) {
                layerIdsToColorSelectionObj[layerId] = GenColors(connectionId)
            }
        }

        return layerIdsToColorSelectionObj
    }, [selections])

    return (
        <main className='h-full w-full relative bg-neutral-100 touch-none'>
            <InfoPanel boardId={boardId} />
            <ParticipantsPanel />
            <ToolbarPanel
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                undo={history.undo}
                redo={history.redo}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <EukaDrawBoard
                layerIds={layerIds}
                camera={camera}
                selectionColor={layerIdsColorsSelection}
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
                onLayerPointerDown={onLayerPointerDown}
                onResizeHandlePionterDown={onResizeHandlePionterDown}
            />
        </main>
    )
}
