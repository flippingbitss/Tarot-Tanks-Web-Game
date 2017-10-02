import { Container, Text } from 'createjs-module'
import { EventEmitter } from "events";
import { WIDTH, HEIGHT } from "../../constants";

export class Scene extends Container{
  
  constructor() {
      super();
    this.eventEmitter = new EventEmitter();
    this.test();
  }

  test() {
    let helloWorld = new Text("Hello world 2 !", "30px Arial", "red");
    helloWorld.regX = helloWorld.getBounds().width / 2;
    helloWorld.regY = helloWorld.getBounds().height / 2;

    helloWorld.x = WIDTH / 2;
    helloWorld.y = HEIGHT / 2;

    this.addChild(helloWorld);
  }
  
  /**
   * @param {string|symbol} event 
   * @param {any} callback 
   * @memberof Scene
   */
  on(event, callback) {
    this.eventEmitter.addListener(event, callback);
  }

  /**
   * @param {string|symbol} event 
   * @param {any} listener 
   * @memberof Scene
   */
  removeListener(event, listener) {
    this.eventEmitter.removeListener(event, listener);
  }
}
