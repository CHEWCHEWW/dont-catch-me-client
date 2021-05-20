import Phaser from "phaser";

export default class CountDownScene extends Phaser.Scene {
  constructor(mainScene) {
    super("CountDownScene");

    this.mainScene = mainScene;
  }

  create() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.mainScene.pause();

    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.countDownCount = 4;

    this.text = this.add.text(300, 300, "", {
      fontSize: "100px", 
      fill: "#FFFFFF", 
      fontFamily: "MainFont" 
    });

    this.interval = window.setInterval(() => {
      this.countDownCount--;

      this.text.destroy();

      this.text = this.add.text(480, 330, this.countDownCount, {
        fontSize: "100px", 
        fill: "#FFFFFF", 
        fontFamily: "MainFont" 
      });
    }, 1000);
  }

  update() {
    if (this.countDownCount <= 0) {
      window.clearInterval(this.interval);
      
      this.text.destroy();
      this.scene.remove();

      this.mainScene.resume();
    }
  }
}
