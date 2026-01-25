export default class Camera {
  #target
  #world
  #isBackScroll
  #centerScreenPointX
  #rightBorderWorldPointX

  constructor(cameraSettings) {
    this.#target = cameraSettings.target
    this.#world = cameraSettings.world
    this.isBackScroll = cameraSettings.isBackScroll

    this.#centerScreenPointX = cameraSettings.screenSize.width / 2
    this.#rightBorderWorldPointX = this.#world.width - this.#centerScreenPointX
  }
  update() {
    if (this.#target.x > this.#centerScreenPointX) {
      this.#world.x = this.#centerScreenPointX - this.#target.x
    }
  }
}
