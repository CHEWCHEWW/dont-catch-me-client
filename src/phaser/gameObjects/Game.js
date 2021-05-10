export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  preload() {
    this.load.image("tiles", "iso-12-tilesset.png");
    this.load.tilemapTiledJSON("map", "iso-12-tilesset.json");
  }

  create() {
    const map = this.add.tilemap("map");
    const tileset = map.addTilesetImage("iso-12-tilesset", "tiles");

    this.boardLayer = map.createDynamicLayer("Tile Layer 1", tileset)
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
