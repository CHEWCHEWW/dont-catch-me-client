import Stage from "../parent/Stage";

import store from "../../../store";
import { updateGameProgress } from "../../../redux/slices/singlePlaySlice";
import { gameProgress } from "../../../constants/gameState";
import { Level3 } from "../../../constants/enemyList";

export default class Stage3 extends Stage {
  constructor() {
    super("stage3");
  }

  create() {
    this.setBackground(3);

    this.setCharacters(Level3);

    super.create();
  }

  update(time, delta) {
    super.update();

    const callback = () => this.game.events.emit("gameClear", { score: this.registry.values.score, time: this.registry.values.time });

    if (this.coinCount && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
