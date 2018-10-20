import {
  Game,
} from "phaser";

import {
    DuelScene,
} from "./scenes/index";

const gameConfig: GameConfig = {
  height: 600,
  physics: {
      arcade: {
          debug: true,
          gravity: { y: 900},
      },
      default: "arcade",
  },
  scene: DuelScene,
  type: Phaser.AUTO,
  width: 800,
};

const game = new Game(gameConfig);
