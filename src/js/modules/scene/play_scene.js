import { Container,Text } from 'createjs-module'
import { Button } from '../common/button'
import { WIDTH,HEIGHT} from '../../constants'

import startButtonImg from '../../../assets/images/startButton.png'

export class MenuScene extends Container {
  constructor(args) {
    super(args);
    this.Main();
  }

  Main() {
    let startButton = new Button(startButtonImg, WIDTH/2, HEIGHT/2, true);
   
    this.addChild(startButton)

  }
}
