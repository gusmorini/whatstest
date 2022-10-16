export default class MicrophoneController {
  constructor() {
    this.start();
  }

  start() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this._stream = stream;
        let audio = new Audio();
        audio.srcObject = this._stream;
        audio.play();
      })
      .catch((err) => console.error(err));
  }

  stop() {
    this._stream.getTracks().forEach((track) => track.stop());
  }
}
