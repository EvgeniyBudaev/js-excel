import {$} from "@core/dom";

export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }

  getRoot() {
    const $root = $.create('div', 'excel')

    this.components.forEach(Component => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.innerHTML = component.toHTML()
      $root.append($el)
    })

    return $root
  }

  render() {
    // beforeBegin – перед elem, afterBegin – внутрь elem, в самое начало, beforeEnd – внутрь elem, в конец, afterEnd – после elem
    // this.$el.insertAdjacentHTML('afterbegin', `<h1>Test<h1></h1>`)
    this.$el.append(this.getRoot())
  }
}
