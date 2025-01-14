import { memo } from 'react'

import { Cursor } from './cursors'
import { useOthersConnectionIds } from '@/liveblocks.config'

export const CursorsPresence = memo(() => {
    const ids = useOthersConnectionIds()

    return (
        <>
            {ids.map(connectionId => (
                <Cursor connectionId={connectionId} key={connectionId} />
            ))}
        </>
    )
})

CursorsPresence.displayName = 'CursorsPresence'
