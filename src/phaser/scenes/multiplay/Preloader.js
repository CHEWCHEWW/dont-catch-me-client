import Preloader from "../parent/preloader";

export default class MultiPreloader extends Preloader {
  completeLoading() {
    this.scene.start("multi");
  }
}
