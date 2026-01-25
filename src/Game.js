import { Container } from '../lib/pixi.mjs'
import Camera from './Camera.js'
import Hero from './Entities/Hero/Hero.js'
import PlatformFactory from './Entities/Platforms/PlatformFactory.js'
import KeyboardProcessor from './KeyboardProcessor.js'

export default class Game {
  #pixiApp
  #hero
  #platforms = []
  #camera

  keyboardProcessor

  constructor(pixiApp) {
    this.#pixiApp = pixiApp

    const worldContainer = new Container()
    this.#pixiApp.stage.addChild(worldContainer)

    this.#hero = new Hero(worldContainer)
    this.#hero.x = 100
    this.#hero.y = 100

    const platformFactory = new PlatformFactory(worldContainer)

    this.#platforms.push(platformFactory.createPlatform(100, 420))
    this.#platforms.push(platformFactory.createPlatform(300, 420))
    this.#platforms.push(platformFactory.createPlatform(500, 420))
    this.#platforms.push(platformFactory.createPlatform(700, 420))
    this.#platforms.push(platformFactory.createPlatform(1100, 420))

    this.#platforms.push(platformFactory.createPlatform(300, 560))

    this.#platforms.push(platformFactory.createBox(0, 738))
    this.#platforms.push(platformFactory.createBox(200, 738))

    const box = platformFactory.createBox(400, 708)
    box.isStep = true
    this.#platforms.push(box)

    this.keyboardProcessor = new KeyboardProcessor(this)
    this.setKeys()

    const cameraSettings = {
      target: this.#hero,
      world: worldContainer,
      screenSize: this.#pixiApp.screen,
      maxWorldWidth: worldContainer.width,
      isBackScrollX: true,
    }
    this.#camera = new Camera(cameraSettings)
  }

  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    }

    this.#hero.update()

    for (let i = 0; i < this.#platforms.length; i++) {
      if (this.#hero.isJumpState() && this.#platforms[i].type != 'box') {
        continue
      }

      const collisionResult = this.getPlatfromCollisionResult(this.#hero, this.#platforms[i], prevPoint)
      if (collisionResult.vertical == true) {
        this.#hero.stay(this.#platforms[i].y)
      }
    }

    this.#camera.update()
  }

  getPlatfromCollisionResult(character, platform, prevPoint) {
    const collisionResult = this.getOrientCollisionResult(character.collisionBox, platform, prevPoint)

    if (collisionResult.vertical == true) {
      character.y = prevPoint.y
    }
    if (collisionResult.horizontal == true && platform.type == 'box') {
      if (platform.isStep) {
        character.stay(platform.y)
      }
      character.x = prevPoint.x
    }

    return collisionResult
  }

  getOrientCollisionResult(aaRect, bbRect, aaPrevPoint) {
    const collisionResult = {
      horizontal: false,
      vertical: false,
    }

    if (!this.isCheckAABB(aaRect, bbRect)) {
      return collisionResult
    }

    aaRect.y = aaPrevPoint.y
    if (!this.isCheckAABB(aaRect, bbRect)) {
      collisionResult.vertical = true
      return collisionResult
    }

    collisionResult.horizontal = true
    return collisionResult
  }

  isCheckAABB(entity, area) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    )
  }

  setKeys() {
    this.keyboardProcessor.getButton('Space').executeDown = function () {
      if (
        this.keyboardProcessor.isButtonPressed('KeyS') &&
        !(this.keyboardProcessor.isButtonPressed('KeyA') || this.keyboardProcessor.isButtonPressed('KeyD'))
      ) {
        this.#hero.throwDown()
      } else {
        this.#hero.jump()
      }
    }
    const arrowLeft = this.keyboardProcessor.getButton('KeyA')
    arrowLeft.executeDown = function () {
      this.#hero.startLeftMove()
      this.#hero.setView(this.getArrowButtonContex())
    }
    arrowLeft.executeUp = function () {
      this.#hero.stopLeftMove()
      this.#hero.setView(this.getArrowButtonContex())
    }

    const arrowRight = this.keyboardProcessor.getButton('KeyD')
    arrowRight.executeDown = function () {
      this.#hero.startRightMove()
      this.#hero.setView(this.getArrowButtonContex())
    }
    arrowRight.executeUp = function () {
      this.#hero.stopRightMove()
      this.#hero.setView(this.getArrowButtonContex())
    }

    const arrowUp = this.keyboardProcessor.getButton('KeyW')
    arrowUp.executeDown = function () {
      this.#hero.setView(this.getArrowButtonContex())
    }
    arrowUp.executeUp = function () {
      this.#hero.setView(this.getArrowButtonContex())
    }

    const arrowDown = this.keyboardProcessor.getButton('KeyS')
    arrowDown.executeDown = function () {
      this.#hero.setView(this.getArrowButtonContex())
    }
    arrowDown.executeUp = function () {
      this.#hero.setView(this.getArrowButtonContex())
    }
  }

  getArrowButtonContex() {
    const buttonContext = {}
    buttonContext.arrowLeft = this.keyboardProcessor.isButtonPressed('KeyD')
    buttonContext.arrowRight = this.keyboardProcessor.isButtonPressed('KeyA')
    buttonContext.arrowUp = this.keyboardProcessor.isButtonPressed('KeyW')
    buttonContext.arrowDown = this.keyboardProcessor.isButtonPressed('KeyS')
    return buttonContext
  }
}
