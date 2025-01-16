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

    return (
        <foreignObject
            width={name.length * 10 + 24}
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
            <div
                className='absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold'
                style={{ backgroundColor: GenColors(connectionId) }}
            >
                {name}
            </div>
        </foreignObject>
    )
})

Cursor.displayName = 'Cursor'
