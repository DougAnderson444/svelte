<script>
	import { spring } from "../../src/runtime/motion/spring.ts";

	import Inner from "./Inner.svelte.compiled.js";

	let coords = spring(
		{ x: 50, y: 50 },
		{
			stiffness: 0.1,
			damping: 0.25,
		}
	);

	let size = spring(10);
</script>

<div class="container">
	<div style="position: absolute; right: 1em;">
		<label>
			<h3>stiffness ({coords.stiffness})</h3>
			<input
				bind:value={coords.stiffness}
				type="range"
				min="0"
				max="1"
				step="0.01"
			/>
		</label>

		<label>
			<h3>damping ({coords.damping})</h3>
			<input
				bind:value={coords.damping}
				type="range"
				min="0"
				max="1"
				step="0.01"
			/>
		</label>
	</div>

	<svg
		on:mousemove={(e) => coords.set({ x: e.clientX, y: e.clientY })}
		on:mousedown={() => size.set(30)}
		on:mouseup={() => size.set(10)}>
		<circle cx={$coords.x} cy={$coords.y} r={$size} />
	</svg>

	<Inner />
</div>

<style>
	svg {
		width: 100%;
		height: 100%;
		margin: -8px;
	}
	circle {
		fill: #ff3e00;
	}
	.container {
		width: 98vw;
		height: 98vh;
	}
</style>
