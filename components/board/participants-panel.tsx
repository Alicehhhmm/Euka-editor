'use client'

import { UserAvatar } from '@/components/user-avatar'
import { Skeleton } from '@/components/ui/skeleton'

import { GenColors } from '@/lib/utils'
import { useSelf, useOthers } from '@/liveblocks.config'

interface ParticipantsPanelProps {}

const MAX_SHOWN_USERS = 1

export const ParticipantsPanel = ({}: ParticipantsPanelProps) => {
    const users = useOthers()
    const currentUser = useSelf()
    const hasMoreUsers = users.length > MAX_SHOWN_USERS

    return (
        <div className='h-12 absolute top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
            <div className='flex gap-x-2'>
                {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => (
                    <UserAvatar
                        borderColor={GenColors(connectionId)}
                        key={connectionId}
                        src={info?.picture}
                        name={info?.name}
                        fallback={info?.name?.[0] || 'T'}
                    />
                ))}
                {currentUser && (
                    <UserAvatar
                        borderColor={GenColors(currentUser?.connectionId)}
                        src={currentUser?.info?.picture}
                        name={currentUser?.info?.name}
                        fallback={currentUser?.info?.name?.[0] || 'You'}
                    />
                )}
                {hasMoreUsers && (
                    <UserAvatar name={`${users.length - MAX_SHOWN_USERS} more`} fallback={`+${users.length - MAX_SHOWN_USERS}`} />
                )}
            </div>
        </div>
    )
}

export const ParticipantsPanelSkeleton = () => {
    return (
        <div className='h-12 w-[100px] absolute top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md'>
            <Skeleton className='h-full w-full bg-muted-400' />
        </div>
    )
}
