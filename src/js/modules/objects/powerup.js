import { GameObject } from "./index";

export class Powerup extends GameObject {
  constructor(config, x, y, scene) {
    super(config.sprite, x, y, 0, 0, scene);
    this.regX = 0;
    this.regY = 0;
    this.traits = config;
    this.isUsed = false;
  }

  consume(player) {
    if (!this.isUsed) {
      console.log(player.playerNum, "consuming", this.traits.name);
      switch (this.traits.name) {
        case "Repair": {
          player.repair();
          break;
        }
        case "Invulnerability": {
          player.invulnerable = true;
          setTimeout(() => {
            player.invulnerable = false;
          }, this.traits.usageTime * 1000);
          break;
        }
        case "Revive": {
          this.scene.revivePlayer();
          break;
        }
      }

      this.isUsed = true;
    }
  }
}
