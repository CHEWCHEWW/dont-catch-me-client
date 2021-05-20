import Stage from "../parent/Stage";
import { Level2 } from "../../../constants/enemyList";

export default class Stage2 extends Stage {
  constructor() {
    super("stage2");
  }

  create() {
    this.setBackground(2);

    this.setCharacters(Level2);

    super.create();
  }

  update(time, delta) {
    super.update();

    const callback = () => this.scene.start("stage3");

    if (this.coinCount === 0 && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
