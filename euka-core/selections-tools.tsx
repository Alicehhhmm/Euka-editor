'use client'

import { memo } from 'react'
import { useMutation, useSelf } from '@/liveblocks.config'

import { Camera, Color } from './types/canvas'
import { ColorPicker } from './color-picker'

import { useSelectionBounds } from '@/hooks/use-selection-bounds'

interface SelectionsToolsProps {
    camera: Camera
    setLastUsedColor: (color: Color) => void
}
export const SelectionsTools = memo(({ camera, setLastUsedColor }: SelectionsToolsProps) => {
    const selection = useSelf(me => me.presence.selection)

    const setFill = useMutation(
        ({ storage }, fill: Color) => {
            const liveLayers = storage.get('layers')
            setLastUsedColor(fill)

            selection.forEach(layerId => liveLayers.get(layerId)?.set('fill', fill))
        },
        [selection, setLastUsedColor]
    )

    const selectionBounds = useSelectionBounds()

    if (!selectionBounds) {
        return null
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x
    const y = selectionBounds.y + camera.y

    return (
        <div
            className='absolute p-3 rounded-md bg-white shadow-sm border flex select-none'
            style={{
                transform: `
                    translate(
                        calc(${x}px - 50%), 
                        calc(${y - 16}px - 100%)
                    )
                `,
            }}
        >
            {/* Aadd Tools */}
            <ColorPicker onChange={setFill} />
        </div>
    )
})
