<script>
	export let name = "World";
	let date = new Date(Date.now());

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
<h3>Date is {date.toLocaleTimeString()}</h3>

<div>
	<form action="/app">
		<label for="name">Enter Something:</label><br />
		<input type="text" id="name" name="name" bind:value={name} /><br />
		<input type="submit" value="Submit" />
	</form>
</div>

<style>
	h1 {
		color: purple;
	}
	h2 {
		color: darkblue;
	}
	h3 {
		color: grey;
	}
</style>
