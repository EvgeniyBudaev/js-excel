export class Emitter {
  constructor() {
    this.listeners = {}
  }

  // dispatch, fire, trigger
  // Уведомляем слушателей если они есть
  // 'focus' или 'formula:done' это event. Просто строчка
  // table.emit('table:select', {a:1})
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
  // Подписываемся на уведомления
  // Добавялем нового слушателя
  // formula.subcribe('table:select', () => {})
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return () => {
      this.listeners[event] =
        this.listeners[event].filter(listener => listener !== fn)
    }
  }
}

// // Example
// const emitter = new Emitter()
// const unsub = emitter.subscribe('vladilen', data => console.log('Sub: ', data))
// emitter.emit('vladilen', 42)
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After 1 seconds')
// }, 1000)
//
// setTimeout(() => {
//   unsub()
// }, 2000)
//
// setTimeout(() => {
//   emitter.emit('vladilen', 'After 3 seconds')
// }, 3000)
