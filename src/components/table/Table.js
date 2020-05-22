import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    });
  }

  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize'))
    if (event.target.dataset.resize) {
      // console.log('Start resizing', event.target.dataset.resize)
      const $resizer = $(event.target)
      // const $parent = $resizer.$el.parentNode // плохой подход
      // const $parent = $resizer.$el.closet('.column') // лучше, но все равно плохо
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()

      document.onmousemove = e => {
        console.log('mousemove')
        // const delta = Math.floor(e.pageX - coords.right) // получить целочисленные значения
        const delta = e.pageX - coords.right
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px'
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }
}
