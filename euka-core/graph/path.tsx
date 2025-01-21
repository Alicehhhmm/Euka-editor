import { getStroke } from 'perfect-freehand'
import { getSvgPathFromStroke } from '../_utils'
import { PathLayer } from '../types/canvas'

interface PathProps {
    x: number
    y: number
    points: number[][]
    fill: string
    storke?: string
    onPointerDown: (e: React.PointerEvent) => void
}

export const Path = ({ x, y, points, fill, storke = '#000', onPointerDown }: PathProps) => {
    return (
        <path
            x={x}
            y={y}
            fill={fill}
            stroke={storke}
            strokeWidth={1}
            onPointerDown={onPointerDown}
            d={getSvgPathFromStroke(
                getStroke(points, {
                    size: 16,
                    thinning: 0.5,
                    smoothing: 0.5,
                    streamline: 0.5,
                })
            )}
            className='drop-shadow-md'
            style={{
                transform: `translate(${x}px,${y}px)`,
                stroke: storke,
                strokeWidth: 1,
            }}
        />
    )
}
