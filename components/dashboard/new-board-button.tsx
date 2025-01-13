'use client'

import { useRouter } from 'next/navigation'
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
    const router = useRouter()
    const { mutate, pending } = useApiMutation(api.board.create)

    const handleCreated = () => {
        if (!orgId) return

        mutate({
            orgId,
            title: 'Untitled',
        })
            .then(id => {
                toast.success('Board created successfully!')
                router.push(`/board/${id}`)
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
                'col-span-1 aspect-[100/127] bg-slate-400 rounded-lg hover:bg-slate-600 flex flex-col items-center justify-center py-6',
                (pending || disabled) && 'opacity-75 hover:bg-slate-600 cursor-not-allowed'
            )}
        >
            <div className=''></div>
            <Plus size={32} className='w-12 h-12 text-white stroke-1' />
            <p className='text-sm text-white font-semibold'>New board</p>
        </button>
    )
}
