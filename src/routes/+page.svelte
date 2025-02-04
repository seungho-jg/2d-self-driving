<script lang="ts">
  import Point from "$lib/primitives/point";
  import Segment from "$lib/primitives/segment";
  import Graph from "$lib/math/graph";
  import GraphEditor from "$lib/tools/graphEditor"
  import Viewport from "$lib/tools/viewport";
  import Polygon from "$lib/primitives/polygon";
  import Envelope from "$lib/primitives/envelope";
  
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let graphEditor: GraphEditor;
  let viewport: Viewport;
  
  let animationId: number
  let graphString: string | null
  let graphInfo
  let graph: Graph


  
  $effect(()=> {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    graphString = localStorage.getItem("graph")
    graphInfo =  graphString ? JSON.parse(graphString) : null
    graph = graphInfo
    ? Graph.load(graphInfo)
    : new Graph([],[])

    viewport = new Viewport(canvas)
    graphEditor = new GraphEditor(viewport, graph)

    function animation(){
      viewport.reset()
      graphEditor.display()
      new Envelope(graph.segments[1], 100).draw(ctx)
      animationId = requestAnimationFrame(animation)
    }
    animation()

    // 클린업 함수 반환
    return () => {
      if (animationId) {
        // console.log("클린업 함수 실행",animationId)
        cancelAnimationFrame(animationId)
      }
      ctx?.clearRect(0, 0, canvas.width, canvas.height)

      // @ts-ignore
      ctx = null
      // @ts-ignore
      graph = null
      // @ts-ignore
      graphEditor = null
    }
  })

  function addSegment() {
    // 점이 1개 이하면 세그먼트를 만들 수 없음
    if (graph.points.length <= 1) {
      console.log("점이 충분하지 않습니다")
      return
    }
    // 현재 가능한 최대 세그먼트 수 계산
    const n = graph.points.length
    const maxSegments = (n * (n-1)) / 2
    
    // 현재 세그먼트 수가 최대에 도달했다면 더 이상 추가할 수 없음
    if (graph.segments.length >= maxSegments) {
      console.log("더 이상 새로운 세그먼트를 추가할 수 없습니다")
      return
    }
    const index1 = Math.floor(Math.random() * graph.points.length)
    const index2 = Math.floor(Math.random() * graph.points.length)
    const success = graph.tryAddSegment(new Segment(graph.points[index1], graph.points[index2]))
    if (!success) {
      console.log("다시 시도")
      addSegment()
    }
  }

  function addPoint() {
    graph.tryAddPoint(new Point(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
    ))
    
  }

  function removePoint() {
    if (graph.points.length === 0) return
    const index = Math.floor(Math.random() * graph.points.length)
    graph.removePoint(graph.points[index])

  }

  function removeSegment() {
    if (graph.segments.length === 0) return
    const index = Math.floor(Math.random() * graph.segments.length)
    graph.removeSegment(graph.segments[index])
  }

  function removeAll() {
    graph.dispose()
  }

  function dispose() {
    graphEditor.dispose()
  }

  function save() {
    localStorage.setItem("graph", JSON.stringify(graph))
  }

</script>
<div class="flex flex-row justify-center absolute mx-auto w-full gap-2 top-2">
  <button class="btn" onclick={dispose}>🗑️</button>
  <button class="btn" onclick={save}>💾</button>
</div>

<canvas bind:this={canvas}></canvas>


<style>
  canvas {
    background: slategray;
  }
</style>