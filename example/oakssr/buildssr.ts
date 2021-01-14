// To build this, run:
// deno run --config=../tsconfig.json --importmap=../import_map.json --allow-all --unstable ./buildssr.ts Home.svelte

// "https://github.com/sveltejs/svelte/master/src/compiler/index.ts"
import { compile } from "../../src/compiler/index.ts";

async function build(source: string) {
  try {
    let src = await Deno.readTextFile(source);
    const compiledSsr = compile(src, {
      filename: source,
      generate: "ssr",
      name: "App",
      sveltePath: "https://esm.sh/svelte",
    });
    const modifiedSsr = compiledSsr.js.code.replace("https://esm.sh/svelte/internal", "./internals.js")
    const fileName = compiledSsr.js.map.sources[0]+".compiled.js"
    await Deno.writeTextFile(fileName, modifiedSsr); 
  } catch (error) {
    console.error(error)
  }
}

await build(Deno.args[0]);
