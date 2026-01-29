import Runner from './Runner.Js'

export default class RunnerFactory {
  #worldContainer
  constructor(worldContainer) {
    this.#worldContainer = worldContainer
  }

  create(x, y) {
    const runner = new Runner(this.#worldContainer)
    runner.x = x
    runner.y = y

    return runner
  }
}
