import { Skeleton } from '@/components/ui/skeleton'

interface InfoPanelProps {}

export const InfoPanel = ({}: InfoPanelProps) => {
    return (
        <div className='h-12 absolute top-2 left-2 bg-white rounded-md px-1.5 flex items-center shadow-md'>
            <h1>InfoPanel</h1>
            <p>TODO: infomation about the board</p>
        </div>
    )
}

InfoPanel.Skeleton = function InfoPanelSkeleton() {
    return (
        <div className='h-12 w-[300px] absolute top-2 left-2 bg-white rounded-md px-1.5 flex items-center shadow-md'>
            <Skeleton className='h-full w-full bg-muted-400' />
        </div>
    )
}
