'use client'

import { memo } from 'react'
import { BringToFront, SendToBack, Trash2 } from 'lucide-react'

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

    // 将选中图层-移置最顶层
    const moveToFront = useMutation(
        ({ storage }) => {
            const liveLayerIds = storage.get('layerIds')
            const indices: number[] = []

            const arr = liveLayerIds.toImmutable()

            for (let i = 0; i < arr.length; i++) {
                if (selection.includes(arr[i])) {
                    indices.push(i)
                }
            }

            // 确保 i 从最后一个元素索引递减到 0
            for (let i = indices.length - 1; i >= 0; i--) {
                liveLayerIds.move(indices[i], arr.length - 1 - (indices.length - 1 - i))
            }
        },
        [selection]
    )

    // 将选中图层-移置最底层
    const moveToBack = useMutation(
        ({ storage }) => {
            const liveLayerIds = storage.get('layerIds')
            const indices: number[] = []

            const arr = liveLayerIds.toImmutable()

            for (let i = 0; i < arr.length; i++) {
                if (selection.includes(arr[i])) {
                    indices.push(i)
                }
            }

            for (let i = 0; i < indices.length; i++) {
                liveLayerIds.move(indices[i], i)
            }
        },
        [selection]
    )

    // 修改选中与图层颜色
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
            <div className='flex flex-col gap-y-0.5'>
                <ActionTooltip label='Bring to front'>
                    <Button variant='board' size='icon' onClick={moveToFront}>
                        <BringToFront />
                    </Button>
                </ActionTooltip>
                <ActionTooltip label='Send to back' side='bottom'>
                    <Button variant='board' size='icon' onClick={moveToBack}>
                        <SendToBack />
                    </Button>
                </ActionTooltip>
            </div>
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
