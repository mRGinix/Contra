import { Container, Graphics } from '../../../lib/pixi.mjs'

export default class HeroView extends Container {
  constructor() {
    super()

    const view = new Graphics()
    view.lineStyle(1, 0xffff00)
    view.drawRect(0, 0, 20, 90)
    view.drawRect(0, 30, 60, 10)

    this.addChild(view)

    view.pivot.x = 10
    view.x = 10
    // view.scale.x *= -1
  }
}
