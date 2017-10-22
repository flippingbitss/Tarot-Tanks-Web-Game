const PRESSED = 0,
  RELEASED = 1;

export class Keyboard {
  constructor() {
    this.keyMap = new Map();
    this.keyStates = new Map();
    this.keyTracks = {};
  }

  addMapping(keyCode, callback, isHandledOnce = true) {
    this.keyMap.set(keyCode, { once: isHandledOnce, callback });
    console.log("mapping added", keyCode);
  }

  removeMapping(keyCodes) {
    for (let key of keyCodes) this.keyMap.delete(key);
  }

  /**
     * 
     * @param {KeyboardEvent} event 
     * @param {boolean} isHandledOnce
     * @memberof Keyboard
     */

  handleEvent(event) {
    const { keyCode } = event;

    if (!this.keyMap.has(keyCode)) {
      return;
    }

    event.preventDefault();

    const newKeyState = event.type === "keydown" ? PRESSED : RELEASED;
    const oldKeyState = this.keyStates.get(keyCode);

    const mapping = this.keyMap.get(keyCode);
    if (oldKeyState == newKeyState) {
      if (mapping.once) return;
    }

    this.keyStates.set(keyCode, newKeyState);

    mapping.callback(event);
  }

  listenTo(eventDispatcher) {
    ["keydown", "keyup"].forEach(eventName => {
      eventDispatcher.addEventListener(eventName, event => {
        this.handleEvent(event);
      });
    });
  }
}
