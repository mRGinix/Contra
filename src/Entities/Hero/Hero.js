import HeroView from './HeroView.js'

const States = {
  Stay: 'stay',
  Jump: 'jump',
  FlyDown: 'flyDown',
}
export default class Hero {
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

  #isLay = false
  #isStayUp = false

  #view

  constructor(stage) {
    this.#view = new HeroView()
    stage.addChild(this.#view)

    this.#state = States.Jump
    this.#view.showJump()
  }

  get collisionBox() {
    return this.#view.collisionBox
  }

  get x() {
    return this.#view.x
  }
  set x(value) {
    this.#view.x = value
  }
  get y() {
    return this.#view.y
  }
  set y(value) {
    this.#view.y = value
  }

  update() {
    this.#velocityX = this.#movement.x * this.#SPEED
    this.x += this.#velocityX

    if (this.#velocityY > 0 ) {
      if(!(this.#state == States.Jump || this.#state == States.FlyDown)){
        this.#view.showFall()
      }
      this.#state = States.FlyDown
    }

    this.#velocityY += this.#GRAVITY_FORCE
    this.y += this.#velocityY
  }

  stay(platformY) {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      const fakeButtonContex = {}
      fakeButtonContex.arrowLeft = this.#movement.x == -1
      fakeButtonContex.arrowRight = this.#movement.x == 1
      fakeButtonContex.arrowDown = this.#isLay
      fakeButtonContex.arrowUp = this.#isStayUp
      this.#state = States.Stay
      this.setView(fakeButtonContex)
    }

    this.#state = States.Stay
    this.#velocityY = 0

    this.y = platformY - this.#view.collisionBox.height
  }

  jump() {
    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      return
    }
    this.#state = States.Jump
    this.#velocityY -= this.#JUMP_FORCE
    this.#view.showJump()
  }

  isJumpState() {
    return this.#state == States.Jump
  }

  throwDown() {
    this.#state = States.Jump
    this.#view.showFall()
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

  setView(buttonContex) {
    this.#view.flip(this.#movement.x)
    this.#isLay = buttonContex.arrowDown
    this.#isStayUp = buttonContex.arrowUp

    if (this.#state == States.Jump || this.#state == States.FlyDown) {
      return
    }

    if (buttonContex.arrowLeft || buttonContex.arrowRight) {
      if (buttonContex.arrowUp) {
        this.#view.showRunUp()
      } else if (buttonContex.arrowDown) {
        this.#view.showRunDown()
      } else {
        this.#view.showRun()
      }
    } else {
      if (buttonContex.arrowUp) {
        this.#view.showStayUp()
      } else if (buttonContex.arrowDown) {
        this.#view.showLay()
      } else {
        this.#view.showStay()
      }
    }
  }
}
