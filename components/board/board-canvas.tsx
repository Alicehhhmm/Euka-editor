'use client'

import { useCallback, useState, useMemo, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'

import { useHistory, useCanUndo, useCanRedo, useMutation, useStorage, useOthersMapped, useSelf } from '@/liveblocks.config'

import { CanvasState, CanvasMode, Camera, Color, LayerType, Point, Side, XYWH } from '@/euka-core/types/canvas'
import { EukaDrawBoard } from '@/euka-core'
import { MAX_LAYERS } from '@/euka-core/settings'
import { SelectionsTools } from '@/euka-core/selections-tools'
import { findIntersectingLayersWithRectangle, penPointsToPathLayer, pointerEventToCanvasPoint, resizeBounds } from '@/euka-core/_utils'

import { InfoPanel } from './info-panel'
import { ToolbarPanel } from './toolbar-panel'
import { ParticipantsPanel } from './participants-panel'
import { GenColors } from '@/lib/utils'

import { useDisableScrollBounce } from '@/hooks/use-disable-scroll-bounce'
import { useDeleteLayers } from '@/hooks/use-delete-layers'

interface BoardCanvasProps {
    boardId: string
}

export const BoardCanvas = ({ boardId }: BoardCanvasProps) => {
    const layerIds = useStorage(root => root.layerIds)
    const pencilDraft = useSelf(me => me.presence.pencilDraft)

    // 画板状态
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    })
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
    const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 0, g: 0, b: 0 })

    // 画板-操作记录
    useDisableScrollBounce()
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

    // 画板-监听画笔继续绘制
    const continueDrawing = useMutation(
        ({ setMyPresence, self }, point: Point, e: React.PointerEvent) => {
            const { pencilDraft } = self.presence

            if (canvasState.mode !== CanvasMode.Pencil || e.buttons != 1 || pencilDraft === null) {
                return
            }

            setMyPresence({
                cursor: point,
                pencilDraft:
                    pencilDraft.length === 1 && pencilDraft[0][0] === point.x && pencilDraft[0][1] === point.y
                        ? pencilDraft
                        : [...pencilDraft, [point.x, point.y, e.pressure]],
            })
        },
        [canvasState.mode]
    )

    // 画板-监听画笔路径
    const insertPath = useMutation(
        ({ setMyPresence, storage, self }) => {
            const liveLayers = storage.get('layers')
            const { pencilDraft } = self.presence

            if (pencilDraft === null || pencilDraft.length < 2 || liveLayers.size >= MAX_LAYERS) {
                setMyPresence({ pencilDraft: null })
                return
            }

            const layerId = nanoid()
            const layer = new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor))
            liveLayers.set(layerId, layer)

            const liveLayerIds = storage.get('layerIds')
            liveLayerIds.push(layerId)

            setMyPresence({ pencilDraft: null })
            setCanvasState({ mode: CanvasMode.Pencil })
        },
        [lastUsedColor]
    )

    // 画板-监听画笔初始位置
    const startDrawing = useMutation(({ setMyPresence }, point: Point, pressure: number) => {
        setMyPresence({
            pencilDraft: [[point.x, point.y, pressure]],
            penColor: lastUsedColor,
        })
    }, [])

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

    // 画板-监听选择元素移动（或内部区域鼠标移动）
    const translateSelectedLayers = useMutation(
        ({ storage, self }, point: Point) => {
            if (canvasState.mode !== CanvasMode.Translating) {
                return
            }

            const offset = {
                x: point.x - canvasState.current.x,
                y: point.y - canvasState.current.y,
            }

            const livelayers = storage.get('layers')

            for (const id of self.presence.selection) {
                const layer = livelayers.get(id)

                if (layer) {
                    layer.update({
                        x: layer.get('x') + offset.x,
                        y: layer.get('y') + offset.y,
                    })
                }
            }

            setCanvasState({
                mode: CanvasMode.Translating,
                current: point,
            })
        },
        [canvasState]
    )

    // 画板-监听选中图层数量
    const starMultiSelection = useCallback((current: Point, origin: Point) => {
        const threshold = 5

        if (Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) > threshold) {
            setCanvasState({
                mode: CanvasMode.SelectionNet,
                origin,
                current,
            })
        }
    }, [])

    // 画板-更新选中的所有图层网格（更新图层多选网格）
    const updateSelevtionNet = useMutation(
        ({ storage, setMyPresence }, current: Point, origin: Point) => {
            const layers = storage.get('layers').toImmutable()
            setCanvasState({
                mode: CanvasMode.SelectionNet,
                origin,
                current,
            })

            const ids = findIntersectingLayersWithRectangle(layerIds, layers, origin, current)

            setMyPresence({ selection: ids })
        },
        [layerIds]
    )

    // 画板-监听鼠标非选中图层区域
    const unselectLayers = useMutation(({ self, setMyPresence }) => {
        if (self.presence.selection.length > 0) {
            setMyPresence(
                {
                    selection: [],
                },
                {
                    addToHistory: true,
                }
            )
        }
    }, [])

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
            if (canvasState.mode === CanvasMode.Pressing) {
                // 移动网格选择（框选）多个图层
                starMultiSelection(current, canvasState.origin)
            } else if (canvasState.mode === CanvasMode.SelectionNet) {
                // 移动更新选择图层网格
                updateSelevtionNet(current, canvasState.origin)
            } else if (canvasState.mode === CanvasMode.Translating) {
                // 选择元素移动
                translateSelectedLayers(current)
            } else if (canvasState.mode === CanvasMode.Resizing) {
                // 移动边框调整大小
                resizeSelectedLayer(current)
            } else if (canvasState.mode === CanvasMode.Pencil) {
                // 移动画笔绘制
                continueDrawing(current, e)
            }

            setMyPresence({
                cursor: current,
            })
        },
        [camera, canvasState, starMultiSelection, updateSelevtionNet, translateSelectedLayers, resizeSelectedLayer, continueDrawing]
    )

    // 画板-监听光标离开画布
    const onPointerLeave = useMutation(({ setMyPresence }) => {
        setMyPresence({
            cursor: null,
        })
    }, [])

    // 画板-监听鼠标按下
    const onPointerDown = useCallback(
        (e: React.PointerEvent) => {
            const point = pointerEventToCanvasPoint(e, camera)

            if (canvasState.mode === CanvasMode.Inserting) {
                return
            }

            if (canvasState.mode === CanvasMode.Pencil) {
                startDrawing(point, e.pressure)
                return
            }

            setCanvasState({
                mode: CanvasMode.Pressing,
                origin: point,
            })
        },
        [camera, canvasState.mode, setCanvasState, startDrawing]
    )

    // 画板-监听光标抬起
    const onPointerUp = useMutation(
        ({}, e: React.PointerEvent) => {
            const point = pointerEventToCanvasPoint(e, camera)

            if (canvasState.mode === CanvasMode.None || canvasState.mode === CanvasMode.Pressing) {
                // 取消选择的元素（或：监听点击非选中元素区域）
                unselectLayers()
                setCanvasState({
                    mode: CanvasMode.None,
                })
            } else if (canvasState.mode === CanvasMode.Inserting) {
                insertLayer(canvasState.layerType, point)
            } else if (canvasState.mode === CanvasMode.Pencil) {
                insertPath()
            } else {
                setCanvasState({
                    mode: CanvasMode.None,
                })
            }

            // 恢复操作历史记录
            history.resume()
        },
        [camera, canvasState, setCanvasState, history, insertLayer, insertPath, unselectLayers]
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

    const deleteLayers = useDeleteLayers()

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            switch (e.key.toLowerCase()) {
                case 'z': {
                    if (e.ctrlKey || e.metaKey) {
                        if (e.shiftKey) {
                            history.redo()
                        } else {
                            history.undo()
                        }
                        e.preventDefault()
                    }
                    break
                }
            }
        }

        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [history, deleteLayers])

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
            <SelectionsTools camera={camera} setLastUsedColor={setLastUsedColor} />
            <EukaDrawBoard
                layerIds={layerIds}
                camera={camera}
                lastUsedColor={lastUsedColor}
                pencilDraft={pencilDraft}
                canvasState={canvasState}
                selectionColor={layerIdsColorsSelection}
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onLayerPointerDown={onLayerPointerDown}
                onResizeHandlePionterDown={onResizeHandlePionterDown}
            />
        </main>
    )
}
