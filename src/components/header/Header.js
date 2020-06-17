import {ExcelComponent} from "@core/ExcelComponent";
import {$} from "@core/dom";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {debounce} from "@core/utils";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
        <div class="excel__header-button button" data-button="remove">
          <span class="material-icons" data-button="remove">
            delete
          </span>
        </div>
        <div class="excel__header-button button" data-button="exit">
          <span class="material-icons" data-button="exit">
            exit_to_app
          </span>
        </div>
      </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onInput(event) {
    // console.log('onInput')
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
