import { Loader } from 'lucide-react'
import { InfoPanel } from './info-panel'
import { ParticipantsPanel } from './participants-panel'
import { ToolbarPanel } from './toolbar-panel'

export const CanvasLoading = () => {
    return (
        <main className='h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center'>
            <Loader className='w-6 h-6 text-muted-foreground animate-spin' />
            <InfoPanel.Skeleton />
            <ParticipantsPanel.Skeleton />
            <ToolbarPanel.Skeleton />
        </main>
    )
}
