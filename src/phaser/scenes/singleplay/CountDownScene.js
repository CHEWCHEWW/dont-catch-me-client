import Phaser from "phaser";

export default class CountDownScene extends Phaser.Scene {
  constructor(mainScene) {
    super("CountDownScene");

    this.mainScene = mainScene;
  }

  create() {
    this.mainScene.pause();

    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.timer = this.add.text(200, 200, "count", { fontSize: "32px", fill: "#FFFFFF" });

    this.countDownCount = 3;

    this.interval = window.setInterval(() => {
      this.timer.setText(this.countDownCount).setDepth(10);

      this.countDownCount--;
    }, 1000);
  }

  update() {
    if (this.countDownCount === 0) {
      window.clearInterval(this.interval);
      
      this.timer.destroy();
      this.scene.remove();

      this.mainScene.resume();
    }
  }
}
