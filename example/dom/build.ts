import { compile } from "../../src/compiler/index.ts";

async function build(source: string) {
  try {
    let src = await Deno.readTextFile(source);
    const compiledDom = compile(src, {
      filename: source,
      generate: "dom",
      name: "Example",
      sveltePath: "https://esm.sh/svelte",
    });
    const fileName = compiledDom.js.map.sources[0]+".compiled.js"
    await Deno.writeTextFile(fileName, compiledDom.js.code);    
  } catch (error) {
    console.error(error)
  }

  try {
    const p = Deno.run({ cmd: "denopack -i ./main.ts --output ./build.js".split(" ") });    
    console.log(await p.status())
  } catch (error) {
    console.error(error)
  }

}
console.log('Building ', Deno.args[0])
await build(Deno.args[0]);
