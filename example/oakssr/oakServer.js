// Svelte Server Side Rendering
// inspired by https://github.com/lukeed/svelte-ssr-worker

import { Application, Router, helpers } from "https://deno.land/x/oak/mod.ts";
import App from "./App.svelte.compiled.js"
import HTML from "./index.js";
import safeHeaders from './safeHeaders.js'

const port = 8082;
const app = new Application();
const router = new Router();

const renderApp = (params) => {

  const ssr = App.render(params);

  let inject_head = ssr.head || '';
  if (ssr.css && ssr.css.code) {
    inject_head += `<style>${ssr.css.code}</style>`;
  }
  inject_head += safeHeaders

  const output = 
    (
      HTML // Inject SSR'd header & body contents
        .replace('<!-- {{INJECT.HEAD}} -->', inject_head)
        .replace('<!-- {{INJECT.BODY}} -->', ssr.html)
    )
  return output
}

router
  .get('/', ctx => {
    ctx.response.body = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Server Send Events</title>
          <meta charset="utf-8">
          <script>
            const sse = new EventSource('/server-sent-svelte');
            sse.onerror = () => document.body.innerHTML = 'Connection Error';
            sse.onmessage = ({ data }) => document.body.innerHTML = data;
          </script>
        </head>
        <body></body>
      </html>
    `;
  })
  .get("/server-sent-svelte", (ctx) => {
    const target = ctx.sendEvents();
    ctx.request.accepts("text/event-stream"); // implementations might want to ensure the client request intends to support server-sent events https://oakserver.github.io/oak/sse.html

    const renderAndDispatch = () => {
      const output = renderApp({ date: new Date() })  
      target.dispatchMessage(output);
    }
    renderAndDispatch();
    const interval = setInterval(renderAndDispatch, 1000);
  })
  .all("/:app", (ctx) => {
    
    const query = helpers.getQuery(ctx, { mergeParams: true });
    console.log({query})

    const output = renderApp(query)  

    ctx.response.headers.set("content-type", `text/html;charset=UTF-8`);
    ctx.response.body = output;

  })

app.use(router.routes());

app.addEventListener('listen', () => {
  console.log(`Listening on: http://localhost:${port}/`);
});

await app.listen({ port });
