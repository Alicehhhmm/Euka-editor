import { Camera, Color, Layer, LayerType, PathLayer, Point, Side, XYWH } from "@/euka-core/types/canvas";

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

/**
 * 文本对比色: 根据luminance阈值判断文字颜色
 * @param color 
 * @returns  black | white
 */
export function getContrastingTextColor(color: Color) {
    const luminance = (0.299 * color.r + 0.587 * color.g + 0.114 * color.b) / 255
    return luminance > 182 ? 'black' : 'white'
}

/**
 * 画笔绘制路径
 * @param points 
 * @param color 
 * @returns {XYWH,fill,points[[x,y,pressure],[x,y,pressure],..]}
 */
export function penPointsToPathLayer(points: number[][], color: Color): PathLayer {
    if (points.length < 2) {
        throw new Error('Path must have at least 2 points')
    }

    // 初始化边界值
    let top = Number.POSITIVE_INFINITY
    let bottom = Number.NEGATIVE_INFINITY
    let left = Number.POSITIVE_INFINITY
    let right = Number.NEGATIVE_INFINITY

    // 遍历所有点，计算边界框
    for (const point of points) {
        const [x, y] = point

        if (top > y) {
            top = y
        }

        if (bottom < y) {
            bottom = y
        }

        if (left > x) {
            left = x
        }

        if (right < x) {
            right = x
        }

    }
    return {
        type: LayerType.Path,
        x: left,
        y: top,
        width: right - left,
        height: bottom - top,
        fill: color,
        points: points
            .map(([x, y, pressure]) =>
                [x - left, y - top, pressure]
            )
    }
}

/**
 * 将画笔触点（stroke）绘制路径转换为SVG路径
 * @param stroke 
 * @returns SVGPath: "M ..... Z"
 */
export function getSvgPathFromStroke(stroke: number[][]) {
    if (!stroke.length) return ''

    const d = stroke.reduce(
        (acc, [x0, y0], i, arr) => {
            // 获取当前点的下一个点
            // 如果是最后一个点，则取第一个点，形成闭合路径
            const [x1, y1] = arr[(i + 1) % arr.length];

            // 计算贝塞尔曲线的控制点（中点）
            const cx = (x0 + x1) / 2; // 控制点的 x 坐标
            const cy = (y0 + y1) / 2; // 控制点的 y 坐标

            // 将当前点和控制点的坐标推入累加器数组
            acc.push(x0, y0, cx, cy);
            return acc
        },
        ["M", ...stroke[0], 'Q']
    )

    // 添加 Z 指令，表示路径结束
    d.push('Z')
    return d.join(' ')
}