import { ClassEvent } from "../util/ClassEvent";

export default class MicrophoneController extends ClassEvent {
  constructor() {
    // chama o constructor da classe extendida no caso "ClassEvent"
    super();

    this.start();
  }

  start() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this._stream = stream;
        let audio = new Audio();
        audio.srcObject = this._stream;
        this.trigger("play", audio);
      })
      .catch((err) => console.error(err));
  }

  stop() {
    this._stream.getTracks().forEach((track) => track.stop());
  }
}
