class Point {
  x: number
  y: number
  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D, size = 5, color = 'black'){
    const rad = size / 2
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(this.x, this.y, rad, 0, Math.PI * 2)
    ctx.fill()
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