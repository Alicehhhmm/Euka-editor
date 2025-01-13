import { Skeleton } from '@/components/ui/skeleton'

interface ToolbarPanelProps {}

export const ToolbarPanel = ({}: ToolbarPanelProps) => {
    return (
        <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
            <h1>ToolbarPanel </h1>
            <div className='bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md'>
                <div className=''>Pencil</div>
                <div className=''>Square</div>
                <div className=''>Circle</div>
                <div className=''>Ellipsis</div>
            </div>
            <div className='bg-white rounded-md p-1.5 flex flex-col items-center shadow-md'>
                <div className=''>Undo</div>
                <div className=''>Redo</div>
                <div className=''>Link</div>
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
