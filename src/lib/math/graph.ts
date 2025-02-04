import Point from "$lib/primitives/point";
import Segment from "$lib/primitives/segment";

class Graph {
  points: Point[]
  segments: Segment[]
  constructor(pts: Point[], segs: Segment[]) {
    this.points = pts
    this.segments = segs

  }
  
  static load(graphInfo: {points: Point[], segments: Segment[]}){
    let pts = [];
    return new Graph(
      pts = graphInfo.points.map(pt =>
        new Point(pt.x, pt.y)
      ),
      graphInfo.segments.map(seg =>
          new Segment(
            pts.find(p => p.equars(seg.startPt))!,
            pts.find(p => p.equars(seg.endPt))!
          )
      )
    )
  }

  addPoint(point: Point) {
    this.points.push(point);
  }

  addSegment(seg: Segment) {
    this.segments.push(seg)
  }

  containsPoint(point: Point): Point | undefined {
    return this.points.find((p) => p.equars(point));
  }

  containsSegment(seg: Segment): Segment | undefined {
    return this.segments.find(s => s.equals(seg))
  }

  tryAddSegment(seg: Segment): boolean {
    if (!this.containsSegment(seg) && !seg.startPt.equars(seg.endPt)) {
      this.addSegment(seg)
      return true
    }
    return false
  }

  tryAddPoint(point: Point): boolean {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true
    }
    return false
  }
  removeSegment(seg: Segment) {
    this.segments.splice(this.segments.indexOf(seg),1)
  }

  removePoint(pt: Point){
    const segs = this.getSegmentsWithPoint(pt)
    for (const seg of segs) {
      this.removeSegment(seg)
    }
    this.points.splice(this.points.indexOf(pt),1)
  }

  getSegmentsWithPoint(p: Point) {
    return this.segments.filter(s => s.includes(p))
  }

  dispose(){
    this.points.length = 0
    this.segments.length = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.segments.forEach(seg => 
      seg.draw(ctx)
    )
    this.points.forEach(pt =>
      pt.draw(ctx, {size: 20, color: 'seagreen'})
    )
  }
}

export default Graph