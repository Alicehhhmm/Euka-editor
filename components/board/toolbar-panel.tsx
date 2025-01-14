import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from 'lucide-react'

import { Skeleton } from '@/components/ui/skeleton'
import { ToolButton } from '@/components/board/tool-button'

interface ToolbarPanelProps {}

export const ToolbarPanel = ({}: ToolbarPanelProps) => {
    const handle = () => {}

    return (
        <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
            <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
                <ToolButton label='Select' icon={MousePointer2} isAction={false} onClick={handle} />
                <ToolButton label='Text' icon={Type} isAction={false} onClick={handle} />
                <ToolButton label='Stick note' icon={StickyNote} isAction={false} onClick={handle} />
                <ToolButton label='Rectangle' icon={Square} isAction={false} onClick={handle} />
                <ToolButton label='Ellipse' icon={Circle} isAction={false} onClick={handle} />
                <ToolButton label='Pen' icon={Pencil} isAction={false} onClick={handle} />
            </div>
            <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
                <ToolButton label='Undo' icon={Undo2} isAction={false} onClick={handle} />
                <ToolButton label='Redo' icon={Redo2} isAction={false} onClick={handle} />
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
