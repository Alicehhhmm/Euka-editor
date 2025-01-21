import React from 'react'
import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { cn } from '@/lib/utils'
import { colorToCss, getContrastingTextColor } from '../_utils'
import { useMutation } from '@/liveblocks.config'
import { NoteLayer } from '../types/canvas'

interface NoteProps {
    id: string
    layer: NoteLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

const font = Kalam({
    subsets: ['latin'],
    weight: ['400'],
})

/**
 * 计算字体大小：当文字边框被拉动时，计算出对应的字体大小
 * @param width
 * @param height
 * @returns new fontSize
 */
const calculateFontSize = (width: number, height: number) => {
    const maxFontSize = 96
    const scaleFactor = 0.15
    const fontSizeBasedOnHeight = height * scaleFactor
    const fontSizeBasedOnWidth = width * scaleFactor

    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}

export const Note = ({ id, layer, onPointerDown, selectionColor }: NoteProps) => {
    const { x, y, width, height, fill, value } = layer

    const updatValue = useMutation(({ storage }, newValue: string) => {
        const liveLayer = storage.get('layers')

        if (liveLayer) {
            liveLayer.get(id)?.set('value', newValue)
        }
    }, [])

    const handleContentChange = (e: ContentEditableEvent) => {
        updatValue(e.target.value)
    }

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            onPointerDown={e => onPointerDown(e, id)}
            className='shadow-md drop-shadow-xl'
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
                backgroundColor: fill ? colorToCss(fill) : 'transparent',
            }}
        >
            <ContentEditable
                html={value || 'text'}
                onChange={handleContentChange}
                className={cn('h-full w-full flex items-center justify-center text-center outline-none', font.className)}
                style={{
                    fontSize: calculateFontSize(width, height),
                    color: fill ? getContrastingTextColor(fill) : '#000',
                }}
            />
        </foreignObject>
    )
}
