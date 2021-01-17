
function run (fn) {
  return fn()
}
function run_all (fns) {
  fns.forEach(run)
}
const escaped = {
  '"': '&quot;',
  "'": '&#39;',
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
}

export function escape (html) {
  return String(html).replace(/["'&<>]/g, match => escaped[match])
}

export function null_to_empty (value) {
  return value == null ? '' : value
}

export function validate_component (component, name) {
  if (!component || !component.$$render) {
    if (name === 'svelte:component') name += ' this={...}'
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`)
  }

  return component
}

let on_destroy

export function create_ssr_component (fn) {
  function $$render (result, props, bindings, slots) {
    const html = fn(result, props, bindings, slots)
    return html
  }
  return {
    render: (props = {}, options = {}) => {
      on_destroy = []
      const result = { title: '', head: '', css: new Set() }
      const html = $$render(result, props, {}, options)
      run_all(on_destroy)
      return {
        html,
        css: {
          code: Array.from(result.css).map(css => css.code).join('\n'),
          map: null // TODO
        },
        head: result.title + result.head
      }
    },
    $$render
  }
}

export function add_attribute (name, value, boolean) {
  if (value == null || (boolean && !value)) return ''
  return ` ${name}${value === true ? '' : `=${typeof value === 'string' ? JSON.stringify(escape(value)) : `"${value}"`}`}`
}
