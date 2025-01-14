'use client'

import { ClientSideSuspense } from '@liveblocks/react/suspense'
import { RoomProvider } from '@/liveblocks.config'

interface BoardRoomRoomProviderProps {
    roomId: string
    fallback: React.ReactNode
    children: React.ReactNode
}

export const BoardRoom = ({ children, roomId, fallback }: BoardRoomRoomProviderProps) => {
    return (
        <RoomProvider
            id={roomId}
            initialPresence={{
                cursor: null,
            }}
        >
            <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
        </RoomProvider>
    )
}
