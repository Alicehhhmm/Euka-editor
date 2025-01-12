'use client'

import { Link2 } from 'lucide-react'
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

interface BoardActionsProps {
    id: string
    title: string
    children: React.ReactNode
    side?: DropdownMenuContentProps['side']
    sideOffset?: DropdownMenuContentProps['sideOffset']
}

export const BoardActions = ({ id, title, side, sideOffset, children }: BoardActionsProps) => {
    const onCopyLink = () => {
        navigator.clipboard
            .writeText(`${window.location.origin}/board/${id}`)
            .then(() => {
                toast.success('Link copied to clipboard!')
            })
            .catch(() => {
                toast.error('Failed to copy link to clipboard!')
            })
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent side={side} sideOffset={sideOffset} onClick={e => e.stopPropagation()} className='w-60'>
                <DropdownMenuItem className='p-3 cursor-pointer' onClick={onCopyLink}>
                    <Link2 className='w-4 h-4 mr-2' />
                    Copy board link
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
