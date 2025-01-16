import { RectangleLayer } from '../types/canvas'

interface RectangleProps {
    id: string
    layer: RectangleLayer
    onPointerDown: (e: React.PointerEvent, id: string) => void
    selectionColor?: string
}

export const Rectangle = ({ id, layer, onPointerDown, selectionColor }: RectangleProps) => {
    const { x, y, width, height, fill } = layer

    // console.log('rectangle', x, y, width, height, fill)

    return (
        <rect
            x={0}
            y={0}
            fill='#000'
            width={width}
            height={height}
            strokeWidth={1}
            stroke='transparent'
            onPointerDown={e => onPointerDown(e, id)}
            className='drop-shadow-md'
            style={{
                transform: `translate(${x}px,${y}px)`,
            }}
        />
    )
}
