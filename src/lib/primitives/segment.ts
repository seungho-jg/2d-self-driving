import Point from "./point";

interface segmentStyle {
  lineWidth?: number;
  color?: string;
  dash?: boolean;
}
class Segment {
  startPt: Point
  endPt: Point
  constructor(p1: Point, p2: Point){
    this.startPt = p1
    this.endPt = p2
  }

  equals(seg: Segment): boolean {
    return this.includes(seg.startPt) && this.includes(seg.endPt)
  }

  includes(point: Point): boolean {
    return this.startPt.equars(point) || this.endPt.equars(point)
  }

  draw(ctx: CanvasRenderingContext2D, { lineWidth=3, color='black', dash=false } : segmentStyle = {}) {
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    dash ? ctx.setLineDash([3,3]) : ctx.setLineDash([])
    ctx.moveTo(this.startPt.x, this.startPt.y)
    ctx.lineTo(this.endPt.x, this.endPt.y)
    ctx.stroke()
    ctx.closePath()
  }
}

export default Segment