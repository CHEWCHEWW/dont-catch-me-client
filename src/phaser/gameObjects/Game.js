export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  preload() {
    this.load.image("tiles", "iso-12-tileset.png");
    this.load.tilemapTiledJSON("map", "iso-12-tileset.json");
  }

  create() {
    const map = this.add.tilemap("map");
    const tileset = map.addTilesetImage("iso-12-tileset", "tiles");

    this.boardLayer = map.createLayer("Tile Layer 1", tileset)
      .setCollisionByProperty({ collides: true });
  }

  update(time, delta) {
  }
}

export const config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: "#FFFFFF",
  parent: "game-container",
  scene: [Game],
};
