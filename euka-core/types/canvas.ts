
export type Color = {
    r: number
    g: number
    b: number
}

export type Camera = {
    x: number
    y: number
    z?: number
}

export type Point = {
    x: number
    y: number
}

export type XYWH = {
    x: number
    y: number
    width: number
    height: number
}

/**
 * Side model
 *  选择边框的八个点(手柄)
 * 【5】——【1】——【9】
 *  |             |
 * 【4】        【8】
 *  |             |
 * 【6】——【2】——【10】
 *
 * 编码规则：上下左右，左上左下，右上右下（1248，56，910）
 * 1: Top
 * 2: Bottom
 * 4: Left
 * 8: Right
 * 5: Top + Left
 * 9: Top + Right
 * 6: Bottom + Left
 * 10: Bottom + Right
 */
export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8,
}

/**
 * Layer modal
 */
export enum LayerType {
    Rectangle,
    Ellipse,
    Path,
    Text,
    Note,
}

export type RectangleLayer = {
    type: LayerType.Rectangle
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type EllipseLayer = {
    type: LayerType.Ellipse
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type PathLayer = {
    type: LayerType.Path
    x: number
    y: number
    width: number
    height: number
    fill: Color
    points: number[][]
    value?: string
}

export type TextLayer = {
    type: LayerType.Text
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

export type NoteLayer = {
    type: LayerType.Note
    x: number
    y: number
    width: number
    height: number
    fill: Color
    value?: string
}

/**
 * 图层
 */
export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer | NoteLayer


/**
 * canvas status 
 * @param
 */
export type CanvasState =
    | {
        mode: CanvasMode.None;
    }
    | {
        mode: CanvasMode.Pressing;
        origin: Point;
    }
    | {
        mode: CanvasMode.SelectionNet;
        origin: Point;
        current?: Point;
    }
    | {
        mode: CanvasMode.Translating;
        current: Point;
    }
    | {
        mode: CanvasMode.Inserting;
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note
    }
    | {
        mode: CanvasMode.Pencil;
        current?: Point;
    }
    | {
        mode: CanvasMode.Resizing;
        initialBounds: XYWH;
        corner: Side
    }

/**
 * canvas manipulation modal
 * @param
 */
export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Pencil,
    Resizing,
}
