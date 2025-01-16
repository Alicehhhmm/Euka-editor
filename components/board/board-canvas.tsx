'use client'

import { useCallback, useState } from 'react'
import { nanoid } from 'nanoid'
import { LiveObject } from '@liveblocks/client'

import { useHistory, useCanUndo, useCanRedo, useMutation, useStorage } from '@/liveblocks.config'
import { CanvasState, CanvasMode, Camera, Color, LayerType, Point } from '@/euka-core/types/canvas'

import { EukaDrawBoard } from '@/euka-core'
import { MAX_LAYERS } from '@/euka-core/settings'
import { pointerEventToCanvasPoint } from '@/euka-core/_utils'

import { InfoPanel } from './info-panel'
import { ToolbarPanel } from './toolbar-panel'
import { ParticipantsPanel } from './participants-panel'

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
    const hsitory = useHistory()
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
    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault()

        const current = pointerEventToCanvasPoint(e, camera)

        setMyPresence({
            cursor: current,
        })
    }, [])

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
            hsitory.resume()
        },
        [camera, canvasState, history, insertLayer]
    )

    return (
        <main className='h-full w-full relative bg-neutral-100 touch-none'>
            <InfoPanel boardId={boardId} />
            <ParticipantsPanel />
            <ToolbarPanel
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                undo={() => hsitory.undo()}
                redo={() => hsitory.redo()}
                canUndo={canUndo}
                canRedo={canRedo}
            />
            <EukaDrawBoard
                layerIds={layerIds}
                camera={camera}
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            />
        </main>
    )
}
