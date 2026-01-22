import { Container, Graphics } from '../../lib/pixi.mjs'

const States = {
  Stay: 'stay',
  Jump: 'jump',
  FlyDown: 'flyDown',
}
export default class Hero extends Container {
  #GRAVITY_FORCE = 0.018
  #SPEED = 2
  #JUMP_FORCE = 3
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

  #bounds = {
    width: 20,
    height: 90,
  }

  constructor() {
    super()

    const view = new Graphics()
    view.lineStyle(1, 0xffff00)
    view.drawRect(0, 0, 20, 90)
    view.drawRect(0, 30, 60, 10)

    this.addChild(view)

    // this.scale.x *= -1
  }

  update() {
    this.#velocityX = this.#movement.x * this.#SPEED
    this.x += this.#velocityX

    if (this.#velocityY > 0 && this.isJumpState()) {
      this.#state = States.FlyDown
    }

    this.#velocityY += this.#GRAVITY_FORCE
    this.y += this.#velocityY
  }

  stay(platformY) {
    this.#state = States.Stay
    this.#velocityY = 0

    this.y = platformY - this.height
  }

  jump() {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      return
    }
    this.#state = States.Jump
    this.#velocityY -= this.#JUMP_FORCE
  }

  isJumpState() {
    return this.#state == States.Jump
  }

  throwDown() {
    this.#state = States.Jump
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

  #rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
  getRect() {
    this.#rect.x = this.x
    this.#rect.y = this.y
    this.#rect.width = this.#bounds.width
    this.#rect.height = this.#bounds.height

    return this.#rect
  }
}
