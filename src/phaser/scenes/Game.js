import Hero from "../gameObjects/Hero";
import Enemy from "../gameObjects/Enemy";
import ChaseHeroAI from "../ai/ChaseHeroAI";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  create() {
    this.map = this.add.tilemap("map");

    const tileset = this.map.addTilesetImage("iso-level1", "tiles");

    this.boardLayer = this.map.createLayer("Tile Layer 1", [tileset]);

    this.hero = new Hero(this, 300, 300, "hero");
    this.enemy = new Enemy(this, 200, 200, "hero");
    this.enemy1 = new Enemy(this, 100, 150, "hero");

    this.add.existing(this.hero);
    this.add.existing(this.enemy);
    this.add.existing(this.enemy1);
    
    this.physics.world.enable([this.hero, this.enemy, this.enemy1], Phaser.Physics.Arcade.DYNAMIC_BODY);
    
    this.hero.body.setSize(64, 120, true);
    this.enemy.body.setSize(40, 110, true);
    this.enemy1.body.setSize(40, 110, true);

    this.enemy.setAI(new ChaseHeroAI(this.hero, this.enemy, this.boardLayer));
    this.enemy1.setAI(new ChaseHeroAI(this.hero, this.enemy1, this.boardLayer));

    this.physics.add.collider(this.hero, [this.enemy, this.enemy1], () => {
      this.scene.pause();
    });

    this.physics.add.collider([this.enemy, this.enemy1]);

		this.cameras.main.startFollow(this.hero, true);
    this.cameras.main.setZoom(0.8);
  }

  update(time, delta) {
    this.cursors = this.input.keyboard.createCursorKeys();

    if (this.hero) {
      this.hero.handleMovement(delta, this.cursors, this.boardLayer);
    }
  }
}
