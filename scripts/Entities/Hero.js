import { Container, Graphics } from '../../pixi/pixi.mjs'

const States = {
  Stay: 'stay',
  Jump: 'jump',
}
export default class Hero extends Container {
  #GRAVITY_FORCE = 0.015
  #SPEED = 1.5
  #JUMP_FORCE = 2
  #velocityX = 0
  #velocityY = 0

  #movement = {
    x: 0,
    y: 0,
  }

  #directionContext = {
    left: 0,
    right: 0,
  }

  #state = States.Stay

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
    this.#state = States.Stay
    this.#velocityY = 0
  }

  jump() {
    if (this.#state == States.Jump) {
      return
    }
    this.#state = States.Jump
    this.#velocityY -= this.#JUMP_FORCE
  }

  startLeftMove() {
    this.#directionContext.left = -1

    if (this.#directionContext.right > 0) {
      this.#movement.x = 0
      return
    }

    this.#movement.x = -1
  }

  startRightMove() {
    this.#directionContext.right = 1

    if (this.#directionContext.left < 0) {
      this.#movement.x = 0
      return
    }

    this.#movement.x = 1
  }

  stopLeftMove() {
    this.#directionContext.left = 0
    this.#movement.x = this.#directionContext.right
  }

  stopRightMove() {
    this.#directionContext.right = 0
    this.#movement.x = this.#directionContext.left
  }
}
