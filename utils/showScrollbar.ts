export default function showScrollbar(show: boolean) {
    if(show) {
        window.document.body.classList.remove("hide-scrollbar")
        window.document.body.classList.add("show-scrollbar")
      } else {
        window.document.body.classList.remove("show-scrollbar")
        window.document.body.classList.add("hide-scrollbar")
      }
}