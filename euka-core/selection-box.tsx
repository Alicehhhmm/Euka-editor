'use client'

import { memo } from 'react'

import { useSelf, useStorage } from '@/liveblocks.config'
import { useSelectionBounds } from '@/hooks/use-selection-bounds'

import { LayerType, Side, XYWH } from './types/canvas'

interface SelectionBoxProps {
    onResizeHandlePionterDown: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 8
const STROKE = '#3b82f6'
const STROKE_WIDTH = 1

/**
 * 选择边框的八个点(手柄)
 * 【5】——【1】——【9】
 *  |             |
 * 【4】        【8】
 *  |             |
 * 【6】——【2】——【10】
 * 编码规则：上下左右，左上左下，右上右下（1248，56，910）
 * 1: Top
 * 2: Bottom
 * 4: Left
 * 8: Right
 * 5: Top + Left
 * 9: Top + Right
 * 6: Bottom + Left
 * 10: Bottom + Right
 * @param param onResizeHandlePionterDown
 * @returns element resize
 */
export const SelectionBox = memo(({ onResizeHandlePionterDown }: SelectionBoxProps) => {
    // 图层ID
    const soleLayerId = useSelf(me => (me.presence.selection.length === 1 ? me.presence.selection[0] : null))

    // 手柄
    const isShowingHandles = useStorage(root => {
        return soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    })

    const bounds = useSelectionBounds()

    if (!bounds) {
        return null
    }

    return (
        <>
            <rect
                x={0}
                y={0}
                width={bounds.width}
                height={bounds.height}
                style={{
                    fill: 'transparent',
                    stroke: `${STROKE}`,
                    strokeWidth: STROKE_WIDTH,
                    pointerEvents: 'none',
                    transform: `translate(${bounds.x}px, ${bounds.y}px)`,
                }}
            />
            {isShowingHandles && (
                <>
                    {/* 1 */}
                    <rect
                        x={0}
                        y={0}
                        width={`${HANDLE_WIDTH}px`}
                        height={`${HANDLE_WIDTH}px`}
                        className='fill-white stroke-1 stroke-blue-500 '
                        style={{
                            fill: 'white',
                            stroke: `${STROKE}`,
                            strokeWidth: STROKE_WIDTH,
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                        ${bounds.x - HANDLE_WIDTH / 2}px,
                                        ${bounds.y - HANDLE_WIDTH / 2}px
                                    )`,
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            onResizeHandlePionterDown(Side.Top + Side.Left, bounds)
                        }}
                    />
                    {/* 2 */}
                    <rect
                        x={0}
                        y={0}
                        className='fill-white stroke-1 stroke-blue-500 '
                        style={{
                            fill: 'white',
                            stroke: `${STROKE}`,
                            strokeWidth: STROKE_WIDTH,
                            cursor: 'ns-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                        ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                                        ${bounds.y - HANDLE_WIDTH / 2}px
                                    )`,
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            onResizeHandlePionterDown(Side.Top, bounds)
                        }}
                    />
                    {/* 3 */}
                    <rect
                        x={0}
                        y={0}
                        className='fill-white stroke-1 stroke-blue-500 '
                        style={{
                            fill: 'white',
                            stroke: `${STROKE}`,
                            strokeWidth: STROKE_WIDTH,
                            cursor: 'nesw-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                        ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                                        ${bounds.y - HANDLE_WIDTH / 2}px
                                    )`,
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            onResizeHandlePionterDown(Side.Top + Side.Right, bounds)
                        }}
                    />
                    {/* 4 */}
                    <rect
                        x={0}
                        y={0}
                        className='fill-white stroke-1 stroke-blue-500 '
                        style={{
                            fill: 'white',
                            stroke: `${STROKE}`,
                            strokeWidth: STROKE_WIDTH,
                            cursor: 'ew-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                        ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                                        ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                                    )`,
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            onResizeHandlePionterDown(Side.Right, bounds)
                        }}
                    />
                    {/* 5 */}
                    <rect
                        x={0}
                        y={0}
                        className='fill-white stroke-1 stroke-blue-500 '
                        style={{
                            fill: 'white',
                            stroke: `${STROKE}`,
                            strokeWidth: STROKE_WIDTH,
                            cursor: 'nwse-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                        ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                                        ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px)
                                    `,
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            onResizeHandlePionterDown(Side.Bottom + Side.Right, bounds)
                        }}
                    />
                    {/* 6 */}
                    <rect
                        x={0}
                        y={0}
                        className='fill-white stroke-1 stroke-blue-500 '
                        style={{
                            fill: 'white',
                            stroke: `${STROKE}`,
                            strokeWidth: STROKE_WIDTH,
                            cursor: 'ns-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                        ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                                        ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                                    )`,
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            onResizeHandlePionterDown(Side.Bottom, bounds)
                        }}
                    />
                    {/* 7 */}
                    <rect
                        x={0}
                        y={0}
                        className='fill-white stroke-1 stroke-blue-500 '
                        style={{
                            fill: 'white',
                            stroke: `${STROKE}`,
                            strokeWidth: STROKE_WIDTH,
                            cursor: 'nesw-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                    translate(
                                        ${bounds.x - HANDLE_WIDTH / 2}px,
                                        ${bounds.y - HANDLE_WIDTH / 2 + bounds.height}px
                                    )`,
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            onResizeHandlePionterDown(Side.Bottom + Side.Left, bounds)
                        }}
                    />
                    {/* 8 */}
                    <rect
                        x={0}
                        y={0}
                        className='fill-white stroke-1 stroke-blue-500 '
                        style={{
                            fill: 'white',
                            stroke: `${STROKE}`,
                            strokeWidth: STROKE_WIDTH,
                            cursor: 'ew-resize',
                            width: `${HANDLE_WIDTH}px`,
                            height: `${HANDLE_WIDTH}px`,
                            transform: `
                                translate(
                                    ${bounds.x - HANDLE_WIDTH / 2}px,
                                    ${bounds.y - HANDLE_WIDTH / 2 + bounds.height / 2}px
                                )`,
                        }}
                        onPointerDown={e => {
                            e.stopPropagation()
                            onResizeHandlePionterDown(Side.Left, bounds)
                        }}
                    />
                </>
            )}
        </>
    )
})

SelectionBox.displayName = 'SelectionBox'
