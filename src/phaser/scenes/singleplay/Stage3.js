import Stage from "../parent/stage";

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

    const callback = () => store.dispatch(updateGameProgress(gameProgress.GAME_CLEAR));

    if (this.coinCount === 0 && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
