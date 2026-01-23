import { Container, Graphics } from '../../../lib/pixi.mjs'

export default class HeroView extends Container {
  #bounds = {
    width: 0,
    height: 0,
  }

  #collisionBox = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
  constructor() {
    super()

    this.#bounds.width = 20
    this.#bounds.height = 90
    this.#collisionBox.width = this.#bounds.width
    this.#collisionBox.height = this.#bounds.height

    const images = []
    images.push(this.#getStayImage())
    images.push(this.#getStayUpImage())
    images.push(this.#getRunImage())
    images.push(this.#getRunUpImage())
    images.push(this.#getRunDownImage())
    images.push(this.#getLayImage())
    images.push(this.#getJumpImage())
    images.push(this.#getFallImage())

    for (let i = 0; i < images.length; i++) {
      this.addChild(images[i])
      images[i].x = 120 * i
    }

    // view.pivot.x = 10
    // view.x = 10
    // view.scale.x *= -1
  }

  get collisionBox() {
    this.#collisionBox.x = this.x
    this.#collisionBox.y = this.y
    return this.#collisionBox
  }

  #getStayImage() {
    const view = new Graphics()
    view.lineStyle(1, 0xffff00)
    view.drawRect(0, 0, 20, 90)
    view.drawRect(0, 30, 70, 5)
    return view
  }

  #getStayUpImage() {
    const view = new Graphics()
    view.lineStyle(2, 0xffff00)
    view.drawRect(0, 0, 20, 90)
    view.drawRect(0, -40, 5, 40)
    return view
  }

  #getRunImage() {
    const view = new Graphics()
    view.lineStyle(2, 0xffff00)
    view.drawRect(0, 0, 20, 90)
    view.drawRect(0, 30, 70, 5)
    view.transform.skew.x = -0.1
    return view
  }

  #getRunUpImage() {
    const view = new Graphics()
    view.lineStyle(2, 0xffff00)
    view.drawRect(0, 0, 20, 90)
    view.lineTo(0, 30)
    view.lineTo(40, -20)
    view.lineTo(45, -15)
    view.lineTo(0, 40)
    view.transform.skew.x = -0.1
    return view
  }

  #getRunDownImage() {
    const view = new Graphics()
    view.lineStyle(2, 0xffff00)
    view.drawRect(0, 0, 20, 90)
    view.lineTo(0, 20)
    view.lineTo(40, 60)
    view.lineTo(35, 65)
    view.lineTo(0, 30)
    view.transform.skew.x = -0.1
    return view
  }

  #getLayImage() {
    const view = new Graphics()
    view.lineStyle(2, 0xffff00)
    view.drawRect(0, 0, 90, 20)
    view.drawRect(90, 0, 40, 5)
    view.x -= 45
    view.y += 70
    return view
  }

  #getJumpImage() {
    const view = new Graphics()
    view.lineStyle(2, 0xffff00)
    view.drawRect(0, 0, 40, 40)
    view.x -= 10
    view.y += 25
    return view
  }

  #getFallImage() {
    const view = new Graphics()
    view.lineStyle(2, 0xffff00)
    view.drawRect(0, 0, 20, 90)
    view.drawRect(10, 20, 5, 60)
    view.transform.skew.x = -0.1
    return view
  }
}
