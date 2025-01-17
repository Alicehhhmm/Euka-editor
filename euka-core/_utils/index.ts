import { Camera, Color, Point, Side, XYWH } from "@/euka-core/types/canvas";

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

    // 拖动的是顶部角或边
    if ((corner && Side.Top) === Side.Top) {
        result.y = Math.min(point.y, bounds.y + bounds.height)
        result.height = Math.abs(bounds.y + bounds.height - point.y)
    }

    // 拖动的是底部角或边
    if ((corner && Side.Bottom) === Side.Bottom) {
        result.y = Math.min(point.y, bounds.y);
        result.height = Math.abs(bounds.y - point.y);
    }

    // 拖动的是左侧角或边
    if ((corner && Side.Left) === Side.Left) {
        result.x = Math.min(point.x, bounds.x + bounds.width)
        result.width = Math.abs(bounds.x + bounds.width - point.x)
    }

    // 拖动的是右侧角或边
    if ((corner && Side.Right) === Side.Right) {
        result.x = Math.min(point.x, bounds.x)
        result.width = Math.abs(bounds.x - point.x)
    }

    return result
}