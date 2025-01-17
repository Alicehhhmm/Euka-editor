import { shallow } from "@liveblocks/react";
import { useSelf, useStorage } from "@/liveblocks.config";

import { Layer, XYWH } from "@/euka-core/types/canvas";

/**
 * 计算选择元素的边界点（手柄）的位置
 * @param layers 
 * @returns boundary point
 */
const boundingBox = (layers: Layer[]): XYWH | null => {
    const first = layers[0]

    if (!first) return null;

    let left = first.x,
        right = first.x + first.width,
        top = first.y,
        bottom = first.y + first.height;

    for (let i = 1; i < layers.length; i++) {
        const { x, y, width, height } = layers[i];

        if (left > x) {
            left = x;
        }

        if (right < x + width) {
            right = x + width;
        }

        if (top > y) {
            top = y;
        }

        if (bottom < y + height) {
            bottom = y + height;
        }
    }

    return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
    };
}

export const useSelectionBounds = () => {
    const selection = useSelf((me) => me.presence.selection)

    return useStorage((root) => {
        const selectionLayers = selection
            .map((layerId) => root.layers.get(layerId)!)
            .filter(Boolean)

        return boundingBox(selectionLayers)
    }, shallow)
}