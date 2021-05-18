import Preloader from "../parent/preloader";

import createHeroAnimations from "../../animations/Hero";

export default class SinglePreloader extends Preloader {
  create() {
    super.create();

    createHeroAnimations(this.anims, true);
  }
  
  loadBackgroundResource() {
    super.loadBackgroundResource();

    this.load.tilemapTiledJSON("level2-map", "iso-level2.json");
    this.load.tilemapTiledJSON("level3-map", "iso-level3.json");
  }

  loadHeroResource() {
    super.loadHeroResource();

    this.load.atlas("hero-die-left", "hero-die-left.png", "hero-die-left.json");
    this.load.atlas("hero-die-right", "hero-die-right.png", "hero-die-right.json");
    this.load.atlas("hero-die-back-left", "hero-die-back-left.png", "hero-die-back-left.json");
    this.load.atlas("hero-die-back-right", "hero-die-back-right.png", "hero-die-back-right.json");
  }
}
