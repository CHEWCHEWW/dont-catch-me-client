import Stage from "./Stage";
import { LEVEL_1 } from "../../../../constants/coordinates";
import { GAME_PROGRESS, STAGE } from "../../../../constants/game";

export default class Stage1 extends Stage {
  constructor() {
    super(STAGE.STAGE_1);
  }

  init() {
    super.init();

    this.registry.values.score = 0;
    this.registry.values.time = 0;
  }

  create() {
    this.game.events.emit(GAME_PROGRESS.GAME_START);

    this.setBackground(1);

    this.setCharacters(LEVEL_1);

    super.create();
  }

  update() {
    super.update();

    const callback = () => this.scene.start(STAGE.STAGE_2);

    if (this.coinCount === 0 && !this.isCleared) {
      this.moveNextStage(callback);

      this.isCleared = true;
    }
  }
}
