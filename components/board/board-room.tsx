'use client'

import { LiveMap, LiveList, LiveObject } from '@liveblocks/client'
import { ClientSideSuspense } from '@liveblocks/react/suspense'
import { RoomProvider } from '@/liveblocks.config'
import { Layer } from '@/euka-core/types/canvas'

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
                selection: [],
            }}
            initialStorage={{
                layers: new LiveMap<string, LiveObject<Layer>>(),
                layerIds: new LiveList(['layer1', 'layer2']),
            }}
        >
            <ClientSideSuspense fallback={fallback}>{() => children}</ClientSideSuspense>
        </RoomProvider>
    )
}
