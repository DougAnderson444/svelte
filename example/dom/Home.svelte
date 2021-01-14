<script>
	import Spring from "./Spring.svelte.compiled.js";

	export let name = "World";

	function link(node) {
		function onClick(event) {
			event.preventDefault();
			console.log("Button was clicked");
			history.pushState(null, null, event.target.href);
		}

		node.addEventListener("click", onClick);

		return {
			destroy() {
				node.removeEventListener("click", onClick);
			},
		};
	}
	export let environment = "Deno";
	setInterval(() => {
		environment = environment == "Deno" ? "Browser" : "Deno";
	}, 500);
</script>

<a href="#" use:link>Test</a>
<h1>Svelte {environment}</h1>
<h2>Hello {name}</h2>
<Spring />

<style>
	h1 {
		color: purple;
	}
	h2 {
		color: darkblue;
	}
</style>
