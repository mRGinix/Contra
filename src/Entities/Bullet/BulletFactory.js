import Bullet from './Bullet.js'

export default class BulletFactory {
  constructor() {}

  createBullet(x, y) {
    const bullet = new Bullet()
    bullet.x = x
    bullet.y = y

    return bullet
  }
}
