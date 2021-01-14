<script>
	let color = "purple";
</script>

<div class={color} on:click={() => alert(color)}>Inner</div>

<style>
	.purple {
		background-color: purple;
	}
</style>
