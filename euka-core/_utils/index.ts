import { Camera, Color, Layer, Point, Side, XYWH } from "@/euka-core/types/canvas";

export function pointerEventToCanvasPoint(
    e: React.PointerEvent,
    camera: Camera
) {
    return {
        x: Math.round(e.clientX) - camera.x,
        y: Math.round(e.clientY) - camera.y,
    };
}

export function colorToCss(color: Color) {
    return `#${color.r.toString(16).padStart(2, '0')}${color.g.toString(16).padStart(2, '0')}${color.b.toString(16).padStart(2, '0')}`
}

/**
 * 调整边界框的大小
 * @param {XYWH} bounds - 当前边界框的坐标和尺寸
 * @param {Side} corner - 被拖动的角或边
 * @param {Point} point - 鼠标或触摸点的坐标
 * @returns {XYWH} - 调整后的边界框的坐标和尺寸
 */
export function resizeBounds(
    bounds: XYWH,
    corner: Side,
    point: Point
): XYWH {
    const result = {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
    }

    /**
    * 与运算（&）
    * 进行位与运算时，每一位的结果只有在两个操作数的对应位都为 1 时才为 1，否则为 0
    *   0101 (5)
    * & 0001 (1)
    * ------
    *   0001 (1)
    * 
    */
    // 拖动的是顶部角或边
    if ((corner & Side.Top) === Side.Top) {
        result.y = Math.min(point.y, bounds.y + bounds.height)
        result.height = Math.abs(bounds.y + bounds.height - point.y)
    }

    // 拖动的是底部角或边
    if ((corner & Side.Bottom) === Side.Bottom) {
        result.y = Math.min(point.y, bounds.y);
        result.height = Math.abs(bounds.y - point.y);
    }

    // 拖动的是左侧角或边
    if ((corner & Side.Left) === Side.Left) {
        result.x = Math.min(point.x, bounds.x + bounds.width)
        result.width = Math.abs(bounds.x + bounds.width - point.x)
    }

    // 拖动的是右侧角或边
    if ((corner & Side.Right) === Side.Right) {
        result.x = Math.min(point.x, bounds.x)
        result.width = Math.abs(bounds.x - point.x)
    }

    return result
}


/**
 * 
 */
export function findIntersectingLayersWithRectangle(
    layerIds: readonly string[],
    layers: ReadonlyMap<string, Layer>,
    a: Point,
    b: Point
) {

    const rect = {
        x: Math.min(a.x, b.x),
        y: Math.min(a.y, b.y),
        width: Math.abs(b.x - a.x),
        height: Math.abs(b.y - a.y),
    }

    const ids = []

    for (const layerId of layerIds) {
        const layer = layers.get(layerId)

        if (layer == null) {
            continue
        }

        const { x, y, width, height } = layer

        if (
            rect.x + rect.width > x &&
            rect.x < x + width &&
            rect.y + rect.height > y &&
            rect.y < y + height
        ) {
            ids.push(layerId)
        }

    }

    return ids
}