export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляем слушателя, если они есть
  // table.emit('table:select', {a:1}
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false
    }
    this.listeners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // on, listen
  // Подписываемся на уведомление
  // Добавляем нового слушателя
  // formula.subscribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// Example Пример
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('SuperMan', data => console.log('Sub: ', data))
//
// emitter.emit('SuperMan', 50)
// emitter.emit('123', 100)
//
// setTimeout(() => {
//   unsub()
// }, 1000)
//
// setTimeout(() => {
//   emitter.emit('SuperMan', 'After 3 seconds')
// }, 2000)
//
// setTimeout(() => {
//   emitter.emit('SuperMan', 'After 3 seconds')
// }, 3000)
