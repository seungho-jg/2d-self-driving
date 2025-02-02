import type Graph from "$lib/math/graph";
import Point from "$lib/primitives/point";

class GraphEditor {
  canvas: HTMLCanvasElement
  graph: Graph
  ctx: CanvasRenderingContext2D
  selected: Point | null
  hovered: Point | undefined
  isClicked: boolean

  constructor(canvas: HTMLCanvasElement, grahp: Graph){
    this.canvas = canvas
    this.graph = grahp
    this.selected = null
    this.isClicked = false

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D

    this.#addEventListeners()
  }

  #addEventListeners(){
    // 컨텍스트 메뉴 방지
    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault()
  })
    this.canvas.addEventListener("mousedown", (e : MouseEvent) => {
      if(e.button === 2){ // right click
        if(this.hovered) {
          this.graph.removePoint(this.hovered)
        }

        this.selected = null

      }
      if (e.button === 0) {
        const mouse = new Point(e.offsetX, e.offsetY)
        this.isClicked = true
        if (this.hovered) {
          this.selected = this.hovered
          return
        }
        this.graph.addPoint(mouse)
        this.selected = mouse
      }
    })

    this.canvas.addEventListener("mouseup", (e: MouseEvent) => {
      this.isClicked = false
    })

    this.canvas.addEventListener("mousemove", (e: MouseEvent) => {
      let mouse = new Point(e.offsetX, e.offsetY)
      this.hovered = this.getNearestPoint(mouse, this.graph.points)
      if (this.selected && this.isClicked) {
        this.selected.x = mouse.x
        this.selected.y = mouse.y
      }
    })
  }

  getNearestPoint(pt: Point, pts: Point[]) : Point | undefined {
    const threshold = 10
    return pts.find(p => p.distant(pt) < threshold)
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.hovered) {
      this.hovered.draw(this.ctx, { color:"yellow", fill: true })
    }
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true })
    }
  }
}

export default GraphEditor