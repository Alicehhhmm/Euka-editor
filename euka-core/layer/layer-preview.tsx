'use client'

import { memo } from 'react'

import { useStorage } from '@/liveblocks.config'

import { LayerType } from '../types/canvas'
import { Rectangle } from '../graph/rectangle'
import { Text } from '../graph/text'
import { Note } from '../graph/note'
import { Ellipse } from '../graph/ellipse'
import { Path } from '../graph/path'
import { colorToCss } from '../_utils'

interface LayerPreviewProps {
    id: string
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
    selectionColor?: string
}

export const LayerPreview = memo(({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage(root => root.layers.get(id))

    if (!layer) {
        return null
    }
    // console.log('Layer Preview', layer)

    switch (layer.type) {
        case LayerType.Text:
            return <Text key={id} id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
        case LayerType.Note:
            return <Note key={id} id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
        case LayerType.Rectangle:
            return <Rectangle key={id} id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
        case LayerType.Ellipse:
            return <Ellipse key={id} id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
        case LayerType.Path:
            return (
                <Path
                    key={id}
                    x={layer.x}
                    y={layer.y}
                    points={layer.points}
                    storke={selectionColor}
                    fill={layer.fill ? colorToCss(layer.fill) : '#000'}
                    onPointerDown={e => onLayerPointerDown(e, id)}
                />
            )

        default:
            console.warn('Unknow layer type')
            return null
    }
})

LayerPreview.displayName = 'LayerPreview'
