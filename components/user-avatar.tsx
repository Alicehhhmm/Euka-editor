import { ActionTooltip } from './action-tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
    src?: string
    name?: string
    fallback?: string
    borderColor?: string
}

export const UserAvatar = ({ src, name = 'Teammate', fallback, borderColor }: UserAvatarProps) => {
    return (
        <ActionTooltip label={name} side='bottom' sideOffset={16}>
            <Avatar className='w-8 h-8 border-2' style={{ borderColor }}>
                <AvatarImage src={src} className='text-sm font-semibold' />
                <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
        </ActionTooltip>
    )
}
