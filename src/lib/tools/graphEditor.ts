import type Graph from "$lib/math/graph";
import Point from "$lib/primitives/point";
import Segment from "$lib/primitives/segment";
import type Viewport from "./viewport";

class GraphEditor {
  viewport: Viewport
  canvas: HTMLCanvasElement
  graph: Graph
  ctx: CanvasRenderingContext2D
  selected: Point | null
  hovered: Point | null
  dragging: boolean
  mouse: Point | null
  lastAction: string | null

  constructor(viewport: Viewport, grahp: Graph){
    this.viewport = viewport
    this.canvas = viewport.canvas
    this.graph = grahp
    this.selected = null
    this.dragging = false
    this.hovered = null
    this.mouse = null
    this.lastAction = null

    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D

    this.#addEventListeners()
  }

  #removePoint(pt: Point) {
    this.graph.removePoint(pt)
    this.hovered = null
    if (this.selected == pt) {
      this.selected = null
    }
  }

  #select(pt: Point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, pt))
    }
    this.selected = pt
  }

  #addEventListeners(){
    // 컨텍스트 메뉴 방지
    this.canvas.addEventListener("contextmenu", (e) => {
      e.preventDefault()
  })
    this.canvas.addEventListener("mousedown", this.#handleMouseDown.bind(this))

    this.canvas.addEventListener("mouseup", (e: MouseEvent) => {
      this.dragging = false
      if (this.lastAction === "move") {
        this.selected = null
      }
    })

    this.canvas.addEventListener("mousemove", this.#handleMouseMove.bind(this))
  }

  #handleMouseMove(e: MouseEvent) {
    this.mouse = this.viewport.getMouse(e, true)
    this.hovered = this.getNearestPoint(this.mouse, this.graph.points)
    if (this.selected && this.dragging) {
      this.selected.x = this.mouse.x
      this.selected.y = this.mouse.y
      if (this.lastAction !== "move") {
        this.lastAction = "move"
      }
    }
  }

  #handleMouseDown(e: MouseEvent){
    if(e.button === 2){ // right click
      if (this.selected) {
        this.selected = null
        this.lastAction = null
      } else if (this.hovered){
        this.#removePoint(this.hovered)
        this.lastAction = "remove"
      }
    }
    if (e.button === 0) { // left click
      if (this.hovered) {
        this.#select(this.hovered)
        this.dragging = true
        this.lastAction = "select"
        return
      }
      if (this.mouse){
        this.graph.addPoint(this.mouse)
        this.#select(this.mouse)
        this.hovered = this.mouse
        this.lastAction = "add"
      }
    }
  
  }

  getNearestPoint(pt: Point, pts: Point[]) : Point | null {
    const threshold = 15 * this.viewport.zoom
    return pts.find(p => p.distant(pt) < threshold) || null
  }

  display() {
    this.graph.draw(this.ctx)
    if (this.hovered) {
      this.hovered.draw(this.ctx, { color:"yellow", fill: true })
    }
    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true })
    }
    if (this.mouse && this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse
      new Segment(this.selected, intent).draw(this.ctx, { dash : true })
    }
  }

  dispose(){
    this.graph.dispose()
    this.selected = null
    this.hovered = null
  }
}

export default GraphEditor