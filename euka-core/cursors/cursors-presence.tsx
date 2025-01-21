import { memo } from 'react'
import { shallow } from '@liveblocks/client'
import { useOthersConnectionIds, useOthersMapped } from '@/liveblocks.config'

import { Cursor } from './cursors'
import { Path } from '../graph/path'
import { colorToCss } from '../_utils'

/**
 * 协同光标
 */
const Cursors = () => {
    const ids = useOthersConnectionIds()

    return (
        <>
            {ids.map(connectionId => (
                <Cursor connectionId={connectionId} key={connectionId} />
            ))}
        </>
    )
}

/**
 * 协同画笔光标
 * @returns
 */
const Drafts = () => {
    const others = useOthersMapped(
        other => ({
            pencilDraft: other.presence.pencilDraft,
            penColor: other.presence.penColor,
        }),
        shallow
    )

    return (
        <>
            {others.map(([key, other]) => {
                if (other?.pencilDraft) {
                    return (
                        <Path
                            key={key}
                            x={0}
                            y={0}
                            points={other.pencilDraft}
                            fill={other.penColor ? colorToCss(other.penColor) : '#000'}
                            onPointerDown={() => {}}
                        />
                    )
                }
                return null
            })}
        </>
    )
}

export const CursorsPresence = memo(() => {
    return (
        <>
            {/* 协同团队中：其他用户的实时光标 */}
            <Cursors />
            {/* 协同团队中: 其他用户的画笔光标 */}
            <Drafts />
        </>
    )
})

CursorsPresence.displayName = 'CursorsPresence'
