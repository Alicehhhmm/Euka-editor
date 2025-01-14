import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { ToolButton } from '@/components/board/tool-button'

import { CanvasMode, CanvasState, LayerType } from '@/types/canvas'

interface ToolbarPanelProps {
    canvasState: CanvasState
    setCanvasState: (newState: CanvasState) => void
    undo: () => void
    redo: () => void
    canUndo: boolean
    canRedo: boolean
}

export const ToolbarPanel = ({ canvasState, setCanvasState, undo, redo, canUndo, canRedo }: ToolbarPanelProps) => {
    const handle = () => {}

    return (
        <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
            <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
                <ToolButton
                    label='Select'
                    icon={MousePointer2}
                    isAction={
                        canvasState.mode === CanvasMode.None ||
                        canvasState.mode === CanvasMode.Translating ||
                        canvasState.mode === CanvasMode.SelectionNet ||
                        canvasState.mode === CanvasMode.Pressing ||
                        canvasState.mode === CanvasMode.Resizing
                    }
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.None,
                        })
                    }
                />
                <ToolButton
                    label='Text'
                    icon={Type}
                    isAction={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Text}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Text,
                        })
                    }
                />
                <ToolButton
                    label='Stick note'
                    icon={StickyNote}
                    isAction={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Note}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Note,
                        })
                    }
                />
                <ToolButton
                    label='Rectangle'
                    icon={Square}
                    isAction={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Rectangle}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Rectangle,
                        })
                    }
                />
                <ToolButton
                    label='Ellipse'
                    icon={Circle}
                    isAction={canvasState.mode === CanvasMode.Inserting && canvasState.layerType === LayerType.Ellipse}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Inserting,
                            layerType: LayerType.Ellipse,
                        })
                    }
                />
                <ToolButton
                    label='Pen'
                    icon={Pencil}
                    isAction={canvasState.mode === CanvasMode.Pencil}
                    onClick={() =>
                        setCanvasState({
                            mode: CanvasMode.Pencil,
                        })
                    }
                />
            </div>
            <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
                <ToolButton label='Undo' icon={Undo2} isDisabled={!canUndo} onClick={undo} />
                <ToolButton label='Redo' icon={Redo2} isDisabled={!canRedo} onClick={redo} />
            </div>
        </div>
    )
}

ToolbarPanel.Skeleton = function ToolbarPanelSkeleton() {
    return (
        <div className='bg-white w-[52px] h-[360px] absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 shadow-md rounded-md'>
            <Skeleton className='h-full w-full bg-muted-400' />
        </div>
    )
}
