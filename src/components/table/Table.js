import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {isCell, matrix, nextSelector, shouldResize} from "./table.functions";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selectCell(this.$root.find('[data-id="0:0"]'))

    // this.selection.select($cell)
    // this.$emit('table:select', $cell)

    this.$on('formula:input', text => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
      // console.log(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    // this.$subscribe(state => {
    //   console.log('TableState: ', state)
    // })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
      // console.log('Resize data', data)
    } catch (e) {
      console.warn('Resize error, e.message')
    }
  }

  onMousedown(event) {
    // console.log(event.target.getAttribute('data-resize'))
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const {key} = event

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
      // this.selection.select($next)
      // this.$emit('table:select', $next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }
}

