export default class KeyboardProcessor {
  #keyMap = {
    Space: {
      isDown: false,
    },
    KeyZ: {
      isDown: false,
    },
    KeyD: {
      isDown: false,
    },
    KeyA: {
      isDown: false,
    },
    KeyW: {
      isDown: false,
    },
    KeyS: {
      isDown: false,
    },
  }

  #gameContext
  constructor(gameContext) {
    this.#gameContext = gameContext
  }

  getButton(keyName) {
    return this.#keyMap[keyName]
  }

  onKeyDown(key) {
    const button = this.#keyMap[key.code]
    if (button != undefined) {
      button.isDown = true

      if (button.hasOwnProperty('executeDown')) {
        button.executeDown.call(this.#gameContext)
      }
    }
  }

  onKeyUp(key) {
    const button = this.#keyMap[key.code]
    if (button != undefined) {
      button.isDown = false

      if (button.hasOwnProperty('executeUp')) {
        button.executeUp.call(this.#gameContext)
      }
    }
  }

  isButtonPressed(keyName) {
    return this.#keyMap[keyName].isDown
  }
}
