export default class Camera {
  #target
  #world
  #isBackScroll
  #centerScreenPointX
  #rightBorderWorldPointX
  #lastTargetX = 0

  constructor(cameraSettings) {
    this.#target = cameraSettings.target
    this.#world = cameraSettings.world
    this.isBackScroll = cameraSettings.isBackScroll

    this.#centerScreenPointX = cameraSettings.screenSize.width / 2
    this.#rightBorderWorldPointX = this.#world.width - this.#centerScreenPointX
  }
  update() {
    if (
      this.#target.x > this.#centerScreenPointX &&
      this.#target.x < this.#rightBorderWorldPointX &&
      (this.isBackScroll || this.#target.x > this.#lastTargetX)
    ) {
      this.#world.x = this.#centerScreenPointX - this.#target.x
      this.#lastTargetX = this.#target.x
    }
  }
}
