import { memo } from 'react'

import { Cursor } from './cursors'
import { useOthersConnectionIds } from '@/liveblocks.config'

export const CursorsPresence = memo(() => {
    const ids = useOthersConnectionIds()

    return (
        <>
            {/* 协同团队中：其他用户的实时光标 */}
            {ids.map(connectionId => (
                <Cursor connectionId={connectionId} key={connectionId} />
            ))}
        </>
    )
})

CursorsPresence.displayName = 'CursorsPresence'
