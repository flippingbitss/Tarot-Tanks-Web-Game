import createjs, { SpriteSheet } from "createjs-module";
import { MANIFEST, SPRITES_SPEC } from "./constants";

// fix to enable event loading for preloadjs
window.createjs = createjs;

const assetManager = new createjs.LoadQueue(true);
assetManager.installPlugin(createjs.Sound);
assetManager.loadManifest(MANIFEST);

let gameSpritesheet;
assetManager.on("complete", () => {
  gameSpritesheet = new SpriteSheet(SPRITES_SPEC);
});

export { assetManager, gameSpritesheet };
