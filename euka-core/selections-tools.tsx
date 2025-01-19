'use client'

import { memo } from 'react'
import { Trash2 } from 'lucide-react'

import { ActionTooltip } from '@/components/action-tooltip'
import { Button } from '@/components/ui/button'

import { Camera, Color } from './types/canvas'
import { ColorPicker } from './color-picker'

import { useMutation, useSelf } from '@/liveblocks.config'
import { useSelectionBounds } from '@/hooks/use-selection-bounds'
import { useDeleteLayers } from '@/hooks/use-delete-layers'

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

    const deleteLayer = useDeleteLayers()

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
            <div className='flex items-center pl-2 ml-2 border-l border-neutral-200'>
                <ActionTooltip label='delete layer'>
                    <Button variant='board' size='icon' onClick={deleteLayer}>
                        <Trash2 />
                    </Button>
                </ActionTooltip>
            </div>
        </div>
    )
})
