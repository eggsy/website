import mediumZoom from "medium-zoom"

export const applyMediumZoom = (selector: string = "[data-zoomable]") => {
  mediumZoom(selector, {
    margin: 24,
    background: "#00000090",
  })
}

export default applyMediumZoom
