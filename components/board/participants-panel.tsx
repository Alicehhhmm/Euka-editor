import { Skeleton } from '@/components/ui/skeleton'

interface ParticipantsPanelProps {}

export const ParticipantsPanel = ({}: ParticipantsPanelProps) => {
    return (
        <div className='h-12 absolute top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
            <h1>Participants </h1>
        </div>
    )
}

ParticipantsPanel.Skeleton = function ParticipantsPanelSkeleton() {
    return (
        <div className='h-12 w-[100px] absolute top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
            <Skeleton className='h-full w-full bg-muted-400' />
        </div>
    )
}
