import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  toHtml() {
    return `
      <div class="excel__formula-info">fx</div>
      <div class="excel__formula-input" id="formula" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    // console.log('Formula: onInput', event.target.textContent.trim())
    this.$emit('formula:input', $(event.target).text())
  }

  onClick() {}

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
