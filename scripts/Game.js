import Hero from './Entities/Hero.js'
import Platform from './Entities/Platforms/Platform.js'
import PlatformFactory from './Entities/Platforms/PlatformFactory.js'
import KeyboardProcessor from './KeyboardProcessor.js'

export default class Game {
  #pixiApp
  #hero
  #platforms = []

  keyboardProcessor

  constructor(pixiApp) {
    this.#pixiApp = pixiApp

    this.#hero = new Hero()
    this.#hero.x = 100
    this.#hero.y = 100
    this.#pixiApp.stage.addChild(this.#hero)

    const platformFactory = new PlatformFactory(this.#pixiApp)

    this.#platforms.push(platformFactory.createPlatform(50, 400))
    this.#platforms.push(platformFactory.createPlatform(200, 450))
    this.#platforms.push(platformFactory.createPlatform(400, 400))

    this.keyboardProcessor = new KeyboardProcessor(this)
    this.keyboardProcessor.getButton('ArrowUp').executeDown = function () {
      this.#hero.jump()
    }
    this.keyboardProcessor.getButton('ArrowLeft').executeDown = function () {
      this.#hero.startLeftMove()
    }
    this.keyboardProcessor.getButton('ArrowLeft').executeUp = function () {
      this.#hero.stopLeftMove()
    }
    this.keyboardProcessor.getButton('ArrowRight').executeDown = function () {
      this.#hero.startRightMove()
    }
    this.keyboardProcessor.getButton('ArrowRight').executeUp = function () {
      this.#hero.stopRightMove()
    }
  }

  update() {
    const prevPoint = {
      x: this.#hero.x,
      y: this.#hero.y,
    }

    this.#hero.update()

    for (let i = 0; i < this.#platforms.length; i++) {
      if (!this.isCheckAABB(this.#hero, this.#platforms[i])) {
        continue
      }

      const curryY = this.#hero.y
      this.#hero.y = prevPoint.y
      if (!this.isCheckAABB(this.#hero, this.#platforms[i])) {
        this.#hero.stay()
        continue
      }

      this.#hero.y = curryY
      this.#hero.x = prevPoint.x
    }
  }

  isCheckAABB(entity, area) {
    return (
      entity.x < area.x + area.width &&
      entity.x + entity.width > area.x &&
      entity.y < area.y + area.height &&
      entity.y + entity.height > area.y
    )
  }
}
