// Svelte Server Side Rendering
// inspired by https://github.com/lukeed/svelte-ssr-worker

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import App from "./App.svelte.compiled.js"
import HTML from "./index.js";

const port = 8082;
const app = new Application();
const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/:name", (ctx) => {

    const name = ctx.params.name || 'world';

    const ssr = App.render({ name });

    let inject_head = ssr.head || '';
    if (ssr.css && ssr.css.code) {
      inject_head += `<style>${ssr.css.code}</style>`;
    }

    const output = // "Hello world!"
      (
        HTML // Inject SSR'd header & body contents
          .replace('<!-- {{INJECT.HEAD}} -->', inject_head)
          .replace('<!-- {{INJECT.BODY}} -->', ssr.html)
      );

    ctx.response.headers.set("content-type", `text/html;charset=UTF-8`);
    ctx.response.body = output;

  });

app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: http://localhost:${port}/`);
});

await app.listen({ port });
