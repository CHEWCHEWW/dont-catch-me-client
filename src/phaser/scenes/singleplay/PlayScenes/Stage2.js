import Stage from "./Stage";
import { LEVEL_2 } from "../../../../constants/coordinates";
import { STAGE } from "../../../../constants/game";

export default class Stage2 extends Stage {
  constructor() {
    super(STAGE.STAGE_2);
  }

  create() {
    this.setBackground(2);

    this.setCharacters(LEVEL_2);

    super.create();
  }

  update() {
    super.update();

    const callback = () => this.scene.start(STAGE.STAGE_3);

    if (this.coinCount === 0 && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
