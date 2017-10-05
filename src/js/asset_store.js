import createjs from "createjs-module";
import { MANIFEST } from "./constants";

// fix to enable event loading for preloadjs
window.createjs = createjs
const assetManager = new createjs.LoadQueue(true);
assetManager.loadManifest(MANIFEST);
window.assetManager = assetManager;

export default assetManager