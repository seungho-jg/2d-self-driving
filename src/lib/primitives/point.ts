interface drawPointStyle{
  size?: number;
  color?: string;
  outline?: boolean;
  fill? : boolean;
}
class Point {
  x: number
  y: number
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D, {size = 5, color = 'black', outline = false, fill = false} : drawPointStyle = {}){
    const rad = size / 2
    if (!outline && !fill) {
      ctx.beginPath()
      ctx.fillStyle = color
      ctx.arc(this.x, this.y, rad, 0, Math.PI * 2)
      ctx.fill()
    }
    if (outline) {
      ctx.beginPath()
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow"
      ctx.arc(this.x, this.y, rad * 2, 0, Math.PI*2)
      ctx.stroke()
    }
    if (fill) {
      ctx.beginPath()
      ctx.fillStyle = "yellow"
      ctx.arc(this.x, this.y, rad, 0, Math.PI*2)
      ctx.fill()
    }
    ctx.closePath()
  }

  distant(point: Point) : number {
    return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2))
  }

  equars(point: Point): boolean {
    return this.x === point.x && this.y === point.y
  }
}

export default Point