import { memo } from 'react'

import { useOther } from '@/liveblocks.config'
import { GenColors } from '@/lib/utils'
import { MousePointer2 } from 'lucide-react'

interface CursorsProps {
    connectionId: number
}

export const Cursor = memo(({ connectionId }: CursorsProps) => {
    const info = useOther(connectionId, user => user?.info)
    const cursor = useOther(connectionId, user => user.presence.cursor)

    const name = info?.name || 'Teammate'

    if (!cursor) {
        return null
    }

    const { x, y } = cursor
    console.log('Cursor:Debug:', name, cursor)

    return (
        <foreignObject
            width={50}
            height={50}
            style={{
                transform: `translateX(${x}px) translateY(${y}px)`,
            }}
            className='relation drop-shadow-md'
        >
            <MousePointer2
                className='w-5 h-5'
                style={{
                    fill: GenColors(connectionId),
                    color: GenColors(connectionId),
                }}
            />
        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'
