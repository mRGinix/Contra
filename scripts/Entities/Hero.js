import { Container, Graphics } from '../../pixi/pixi.mjs'

export default class Hero extends Container {
  #GRAVITY_FORCE = 0.015
  #SPEED = 2
  #velocityX = 0
  #velocityY = 0

  #movement = {
    x: 0,
    y: 0,
  }

  constructor() {
    super()

    const view = new Graphics()
    view.lineStyle(1, 0xff0000)
    view.drawRect(0, 0, 20, 60)

    this.addChild(view)
  }

  update() {
    this.#velocityX = this.#movement.x * this.#SPEED
    this.x += this.#velocityX

    this.#velocityY += this.#GRAVITY_FORCE
    this.y += this.#velocityY
  }

  stay() {
    this.#velocityY = 0
  }

  startLeftMove() {
    this.#movement.x = -1
  }

  startRightMove() {
    this.#movement.x = 1
  }

  stop() {
    this.#movement.x = 0
  }
}
