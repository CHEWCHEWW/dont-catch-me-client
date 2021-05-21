import PreloadScene from "../common/PreloadScene";

import createHeroAnimations from "../../animations/Hero";

export default class SinglePreloadScene extends PreloadScene {
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
  }
}
