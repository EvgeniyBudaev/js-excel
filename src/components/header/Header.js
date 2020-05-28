import {ExcelComponent} from "@core/ExcelComponent";

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    });
  }

  toHTML() {
    return `
      <input class="excel__header-input input" type="text" value="Новая таблица"/>
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
}
