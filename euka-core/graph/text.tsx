import React from 'react'
import { Kalam } from 'next/font/google'
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable'

import { cn } from '@/lib/utils'
import { colorToCss } from '../_utils'
import { useMutation } from '@/liveblocks.config'
import { TextLayer } from '../types/canvas'

interface TextProps {
    id: string
    layer: TextLayer
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
    const scaleFactor = 0.5
    const fontSizeBasedOnHeight = height * scaleFactor
    const fontSizeBasedOnWidth = width * scaleFactor

    return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize)
}

export const Text = ({ id, layer, onPointerDown, selectionColor }: TextProps) => {
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
            style={{
                outline: selectionColor ? `1px solid ${selectionColor}` : 'none',
            }}
        >
            <ContentEditable
                html={value || 'text'}
                onChange={handleContentChange}
                className={cn('h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none', font.className)}
                style={{
                    fontSize: calculateFontSize(width, height),
                    color: fill ? colorToCss(fill) : '#000',
                }}
            />
        </foreignObject>
    )
}
