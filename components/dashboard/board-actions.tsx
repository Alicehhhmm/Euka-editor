'use client'

import { Link2, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { api } from '@/convex/_generated/api'
import { useModal } from '@/hooks/use-modal-store'
import { useApiMutation } from '@/hooks/use-api-mutation'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'

interface BoardActionsProps {
    id: string
    title: string
    children: React.ReactNode
    side?: DropdownMenuContentProps['side']
    sideOffset?: DropdownMenuContentProps['sideOffset']
}

export const BoardActions = ({ id, title, side, sideOffset, children }: BoardActionsProps) => {
    const { onOpen } = useModal()
    const { mutate, pending } = useApiMutation(api.board.remove)

    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/board/${id}`)
            .then(() => toast.success('Link copied to clipboard!'))
            .catch(() => toast.error('Failed to copy link to clipboard!'))
    }

    const onRename = () => {
        onOpen('renameBoard', {
            id,
            title,
        })
    }

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success('Board removed successfully!'))
            .catch(e => toast.error('Failed to remove board: ' + e.message))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset} onClick={e => e.stopPropagation()} className='w-60'>
                <DropdownMenuItem className='p-3 cursor-pointer' onClick={onCopyLink}>
                    <Link2 className='w-4 h-4 mr-2' />
                    Copy board link
                </DropdownMenuItem>
                <DropdownMenuItem className='p-3 cursor-pointer' onClick={onRename}>
                    <Pencil className='w-4 h-4 mr-2' />
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header='Delete board?'
                    description='This will delete the board and all of its contents.'
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button variant='ghost' className='w-full justify-start font-normal p-3 cursor-pointer text-sm'>
                        <Trash2 className='w-4 h-4 mr-2' />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
