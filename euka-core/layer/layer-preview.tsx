'use client'

import { memo } from 'react'

import { useStorage } from '@/liveblocks.config'

import { LayerType } from '../types/canvas'
import { Rectangle } from '../graph/rectangle'
import { Ellipse } from '../graph/ellipse'

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
        case LayerType.Rectangle:
            return <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
        case LayerType.Ellipse:
            return <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />

        default:
            console.warn('Unknow layer type')
            return null
    }
})

LayerPreview.displayName = 'LayerPreview'
