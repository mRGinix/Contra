import { Container, Graphics } from "../../../lib/pixi.mjs";

export default class extends Container{

#SPEED = 10

  constructor(){
    super()
    const view = new Graphics()
    view.lineStyle(1, 0xffff00)
    view.drawRect(0,0,5,5)

    this.addChild(view)
  }
  update(){
    this.x += this.#SPEED
  }
}