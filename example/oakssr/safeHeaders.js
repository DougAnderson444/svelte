export default `
<script>
function handler(event){
  console.log('print:', event);
}
window.addEventListener("keyup", handler);
</script>
`
