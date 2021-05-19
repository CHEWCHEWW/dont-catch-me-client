import Preloader from "../parent/Preloader";

import createHeroAnimations from "../../animations/Hero";

export default class MultiPreloader extends Preloader {
  create() {
    super.create();

    createHeroAnimations(this.anims);
  }

  completeLoading() {
    this.scene.start("multi");
  }
}
