<script lang="ts">
  import Point from "$lib/primitives/point";
  import Segment from "$lib/primitives/segment";
  import Graph from "$lib/math/graph";

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const p1 = new Point(100,100)
  const p2 = new Point(250,250)
  const p3 = new Point(500,100)
  const p4 = new Point(200,450)
  const s1 = new Segment(p1,p2)
  const s2 = new Segment(p1,p4)
  const s3 = new Segment(p3,p1)
  const s4 = new Segment(p3,p4)
  const graph = new Graph([p1,p2,p3,p4], [s1,s2,s3,s4])

  $effect(()=> {
    ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    graph.draw(ctx)
  })

</script>
<h1 class="absolute animate-pulse select-none">Welcome to SvelteKit</h1>
<canvas bind:this={canvas}></canvas>

<style>
  canvas {
    background: slategray;
  }
</style>