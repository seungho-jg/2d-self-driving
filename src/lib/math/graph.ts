import Point from "$lib/primitives/point";
import Segment from "$lib/primitives/segment";

class Graph {
  points: Point[]
  segments: Segment[]
  constructor(pts: Point[], segs: Segment[]) {
    this.points = pts
    this.segments = segs
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.segments.forEach(seg => 
      seg.draw(ctx)
    )
    this.points.forEach(pt =>
      pt.draw(ctx, 50, 'seagreen')
    )
  }
}

export default Graph