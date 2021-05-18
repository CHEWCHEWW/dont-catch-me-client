import Preloader from "../parent/Preloader";

export default class MultiPreloader extends Preloader {
  completeLoading() {
    this.scene.start("multi");
  }
}
