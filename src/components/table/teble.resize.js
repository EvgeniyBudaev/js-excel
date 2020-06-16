import {$} from "@core/dom";

export function resizeHandler($root, event) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    // const $parent = $resizer.$el.parentNode // bad
    // const $parent = $resizer.$el.closest('.column') // better but bad
    const $parent = $resizer.closest('[data-type="resizable"]')
    // console.log('$parent', $parent.getCords())
    const coords = $parent.getCords()
    // console.log('[$parent.data.col] ', $parent.data.col)
    const type = $resizer.data.resize
    // console.log('[type] ', type)
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })

    document.onmousemove = e => {
      if (type === 'col') {
        // console.log('mousemove')
        // console.log(e.pageX)
        const delta = e.pageX - coords.right
        // console.log('delta ', delta )
        value = coords.width + delta
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.pageY - coords.bottom
        // console.log('[delta] ', delta)
        value = coords.height + delta
        $resizer.css({bottom: -delta + 'px'})
        // $parent.css({height: value + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  })
}
