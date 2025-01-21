'use client'

import { Camera, CanvasState, CanvasMode, Side, XYWH, Color } from './types/canvas'
import { CursorsPresence } from './cursors/cursors-presence'
import { LayerPreview } from './layer/layer-preview'
import { SelectionBox } from './selection-box'
import { Path } from './graph/path'
import { colorToCss } from './_utils'

interface DrawBoardProps {
    layerIds: readonly string[]
    camera: Camera
    lastUsedColor: Color
    pencilDraft: [x: number, y: number, pressure: number][] | null
    canvasState: CanvasState
    setCanvasState?: (newState: CanvasState) => void
    selectionColor: Record<string, string>
    onWheel: (e: React.WheelEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerLeave: (e: React.PointerEvent) => void
    onPointerDown: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
    onResizeHandlePionterDown: (corner: Side, initialBounds: XYWH) => void
}

export const EukaDrawBoard = ({
    layerIds,
    camera,
    lastUsedColor,
    pencilDraft,
    canvasState,
    setCanvasState,
    selectionColor,
    onWheel,
    onPointerMove,
    onPointerLeave,
    onPointerDown,
    onPointerUp,
    onLayerPointerDown,
    onResizeHandlePionterDown,
}: DrawBoardProps) => {
    return (
        <main className='w-full h-full'>
            <svg
                width='100%'
                height='100%'
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x}px, ${camera.y}px)`,
                    }}
                >
                    {layerIds.map(layerId => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={selectionColor[layerId]}
                        />
                    ))}
                    <SelectionBox onResizeHandlePionterDown={onResizeHandlePionterDown} />
                    {/* TODO: 抽离为独立框选网格组件 */}
                    {canvasState.mode === CanvasMode.SelectionNet && canvasState.current != null && (
                        <rect
                            x={Math.min(canvasState.origin.x, canvasState.current.x)}
                            y={Math.min(canvasState.origin.y, canvasState.current.y)}
                            width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                            height={Math.abs(canvasState.origin.y - canvasState.current.y)}
                            className='fill-blue-500 stroke-blue-500 stroke-1'
                            style={{
                                fill: 'transparent',
                                stroke: `${'#0ea5e9'}`,
                                strokeWidth: 1,
                            }}
                        />
                    )}
                    {/* TODO: 抽离为独立画笔组件 */}
                    {pencilDraft !== null && pencilDraft.length > 0 && (
                        <>
                            <Path x={0} y={0} fill={colorToCss(lastUsedColor)} points={pencilDraft} />
                        </>
                    )}
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}
