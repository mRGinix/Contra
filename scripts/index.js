import Game from './Game.js'
import * as PIXI from '../pixi/pixi.mjs'

const pixiApp = new PIXI.Application({
  width: 1024,
  height: 768,
})
const game = new Game(pixiApp)

document.body.appendChild(pixiApp.view)
document.addEventListener('keydown', function (key) {
  game.onKeyDown(key)
})
document.addEventListener('keyup', function (key) {
  game.onKeyUp(key)
})

pixiApp.ticker.add(game.update, game)