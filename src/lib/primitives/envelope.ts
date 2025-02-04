import Point from "./point";
import Polygon from "./polygon";
import type Segment from "./segment";
import { translate } from "$lib/math/utils";

class Envelope {
  skeleton
  poly
  constructor(skeleton : Segment, width: number){
    this.skeleton = skeleton
    this.poly = this.#generatePolygon(width)
    
  }

  #generatePolygon(width: number) {
    const { startPt, endPt } = this.skeleton;

    const radius = width / 2;
    const alpha = Math.atan2(startPt.y - endPt.y, startPt.x - endPt.x)
    const alpha_cw = alpha + Math.PI / 2;
    const alpha_ccw = alpha - Math.PI / 2;
    const p1_ccw = translate(startPt, alpha_ccw, radius)
    const p2_ccw = translate(endPt, alpha_ccw, radius)
    const p2_cw = translate(endPt, alpha_cw, radius)
    const p1_cw = translate(startPt, alpha_cw, radius)

    return new Polygon([p1_ccw, p2_ccw, p2_cw, p1_cw])
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx, {})
  }
}

export default Envelope