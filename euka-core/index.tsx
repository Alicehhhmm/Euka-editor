'use client'

import { Camera, CanvasState, CanvasMode, Side, XYWH } from './types/canvas'
import { CursorsPresence } from './cursors/cursors-presence'
import { LayerPreview } from './layer/layer-preview'
import { SelectionBox } from './selection-box'

interface DrawBoardProps {
    layerIds: readonly string[]
    camera: Camera
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
                    <CursorsPresence />
                </g>
            </svg>
        </main>
    )
}
