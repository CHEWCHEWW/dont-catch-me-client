import Stage from "../parent/Stage";
import CountDownScene from "./CountDownScene"
import { Level1 } from "../../../constants/enemyList";

export default class Stage1 extends Stage {
  constructor() {
    super("stage1");
  }

  init() {
    super.init();

    this.registry.values.score = 0;
    this.registry.values.time = 0;
  }

  create() {
    const countDownScene = new CountDownScene(this);
    this.scene.add("CountDownScene", countDownScene, true);

    this.game.events.emit("gameStart");
    
    this.setBackground(1);

    this.setCharacters(Level1);

    super.create();
  }

  update(time, delta) {
    super.update();

    const callback = () => this.scene.start("stage2");

    if (this.coinCount === 42 && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
