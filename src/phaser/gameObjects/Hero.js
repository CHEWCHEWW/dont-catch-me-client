import Phaser from "phaser";

import { TileSize } from "../../constants/tile";

const HeroState = {
  Normal: "Normal",
};

export default class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    this.heroState = HeroState.Normal;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.heroState === HeroState.Normal) {
      return;
    }
  }

  handleMovement(delta, cursors, boardLayer, coinLayer) {
    const body = this.body;

    body.setVelocity(0, 0);

    const velocity = body.velocity;

    if (!velocity.lengthSq()) {
      body.setVelocity(0, 0);
    }
    
    const keysDown = this.getKeysDownState(cursors);
    const speed = 200;

    if (keysDown.left) {
      console.log(coinLayer.getTileAtWorldXY(this.x, this.y));
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x - 1, this.y + TileSize.y - 0.5)) {
        this.play("hero-running-back-left", true);
        body.setVelocity(-speed, -speed * 0.5);
      }
    } else if (keysDown.right) {
      console.log(coinLayer.getTileAtWorldXY(this.x, this.y));
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x + 1, this.y + TileSize.y + 0.5)) {
        this.play("hero-running-right", true);
        body.setVelocity(speed, speed * 0.5);
      }
    } else if (keysDown.up) {
      console.log(coinLayer.getTileAtWorldXY(this.x, this.y));
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x - 1, this.y + TileSize.y - 0.5)) {
        this.play("hero-running-back-right", true);
        body.setVelocity(speed, -speed * 0.5);
      }
    } else if (keysDown.down) {
      console.log(coinLayer.getTileAtWorldXY(this.x, this.y));
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x + 1, this.y + TileSize.y + 0.5)) {
        this.play("hero-running-left", true);
        body.setVelocity(-speed, speed * 0.5);
      }
    }
  }

  getKeysDownState(cursors) {
    return {
      left: cursors.left?.isDown,
      right: cursors.right?.isDown,
      up: cursors.up?.isDown,
      down: cursors.down?.isDown
    };
  }

  canGetCoin(coin) {
		const heroPosition = this.body.position

		const coinPosition = coin.body.position.clone();

		coinPosition.x -= coin.body.offset.x
		coinPosition.y -= coin.body.offset.y
    console.log(Phaser.Math.Distance.BetweenPointsSquared(heroPosition, coinPosition));
		return Phaser.Math.Distance.BetweenPointsSquared(heroPosition, coinPosition) <= 6000;
	}
}
