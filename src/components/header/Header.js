import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {debounce} from "@core/utils";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHtml() {
    const title = this.store.getState().title || defaultTitle
    return `
      <input class="excel__header-input input" type="text" value="${title}"/>
      <div class="excel__header-buttons">
        <div class="excel__header-button button">
          <span class="material-icons">
            delete
          </span>
        </div>
        <div class="excel__header-button button">
          <span class="material-icons">
            exit_to_app
          </span>
        </div>
      </div>
    `
  }

  onInput(event) {
    // console.log('onInput')
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
