import Stage from "./Stage";

import { LEVEL_3 } from "../../../../constants/coordinates";
import { GAME_PROGRESS, STAGE } from "../../../../constants/game";

export default class Stage3 extends Stage {
  constructor() {
    super(STAGE.STAGE_3);
  }

  create() {
    this.setBackground(3);

    this.setCharacters(LEVEL_3);

    super.create();
  }

  update() {
    super.update();

    const callback = () => this.game.events.emit(GAME_PROGRESS.GAME_CLEAR, { score: this.registry.values.score, time: this.registry.values.time });

    if (this.coinCount === 0 && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
