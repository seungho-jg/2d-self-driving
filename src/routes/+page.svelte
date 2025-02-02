<script lang="ts">
  import Point from "$lib/primitives/point";
  import Segment from "$lib/primitives/segment";
  import Graph from "$lib/math/graph";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const p1 = new Point(100,100)
  const p2 = new Point(250,250)
  const s1 = new Segment(p1,p2)

  const graph = new Graph([p1,p2], [s1])
  const graphEditor = null

  let animationId: number

  $effect(()=> {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    function animation(){
      ctx.clearRect(0,0, canvas.width, canvas.height)
      graph.draw(ctx)
      animationId = requestAnimationFrame(animation)
    }
    animation()

    //클린업 함수 반환
    return () => {
      if (animationId) {
        console.log(animationId)
        cancelAnimationFrame(animationId)
      }
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

</script>
<div class="flex flex-row justify-center absolute mx-auto w-full gap-2 top-2">
  <button class="btn" onclick={addPoint}>add point</button>
  <button class="btn" onclick={addSegment}>add segment</button>
  <button class="btn" onclick={removePoint}>remove point</button>
  <button class="btn" onclick={removeSegment}>remove segment</button>
  <button class="btn" onclick={removeAll}>remove All</button>
</div>

<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    background: slategray;
  }
</style>