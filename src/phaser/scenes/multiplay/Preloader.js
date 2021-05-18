import SinglePreloader from "../singleplay/Preloader";

export default class MultiPreloader extends SinglePreloader {
  completeLoading() {
    this.scene.start("multi");
  }
}
