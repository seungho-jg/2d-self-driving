import Point from "$lib/primitives/point";

function distance(p1: Point, p2: Point) : number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function add(p1: Point, p2: Point) : Point {
  return new Point(p1.x + p2.x, p1.y + p2.y)
}

function subtract(p1: Point, p2: Point) : Point {
  return new Point(p1.x - p2.x, p1.y - p2.y)
}

function scale(p1: Point, scaler: number ) {
  return new Point(p1.x * scaler, p1.y * scaler)
}

function translate(loc: Point, angle: number, offset: number ) : Point {
  return new Point(
    loc.x + Math.cos(angle)*offset,
    loc.y + Math.sin(angle)*offset
  )
}

export { distance, add, subtract, scale, translate }