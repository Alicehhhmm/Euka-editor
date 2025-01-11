'use client'

import { Plus } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/lib/utils'
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'

interface NewBoardButtonProps {
    orgId: string
    disabled?: boolean
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
    const { mutate, pending } = useApiMutation(api.board.create)

    const handleCreated = () => {
        if (!orgId) return

        mutate({
            orgId,
            title: 'Untitled',
        })
            .then(() => {
                toast.success('Board created successfully!')
                // TODO: Redirect to board/{id}
            })
            .catch(e => {
                toast.error('Failed to create board: ' + e.message)
            })
    }

    return (
        <button
            disabled={pending || disabled}
            onClick={handleCreated}
            className={cn(
                'col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6',
                (pending || disabled) && 'opacity-75'
            )}
        >
            <div className=''></div>
            <Plus size={32} className='w-12 h-12 text-white stroke-1' />
            <p className='text-sm text-white font-light'>New board</p>
        </button>
    )
}
