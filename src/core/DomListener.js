export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error(`No $root provided for DomListeneer!`)
    }
    this.$root = $root
  }
}
