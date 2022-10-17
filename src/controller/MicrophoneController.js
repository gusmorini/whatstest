import { ClassEvent } from "../util/ClassEvent";

export default class MicrophoneController extends ClassEvent {
  constructor() {
    // chama o constructor da classe extendida no caso "ClassEvent"
    super();
    this._available = false;
    this._mimetype = "audio/webm";
    this.start();
  }

  start() {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this._available = true;
        this._stream = stream;
        // let audio = new Audio();
        // audio.srcObject = this._stream;
        this.trigger("ready", this._stream);
      })
      .catch((err) => console.error(err));
  }

  stop() {
    this._stream.getTracks().forEach((track) => track.stop());
  }

  isAvailable() {
    return this._available;
  }

  startRecorder() {
    if (this.isAvailable) {
      this._mediaRecorder = new MediaRecorder(this._stream, {
        mimeType: this._mimetype,
      });
      this._recordedChunks = [];

      this._mediaRecorder.addEventListener("dataavailable", (e) => {
        if (e.data.size > 0) this._recordedChunks.push(e.data);
      });

      this._mediaRecorder.addEventListener("stop", (e) => {
        let blob = new Blob(this._recordedChunks, {
          type: this._mimetype,
        });
        let filename = `rec_${Date.now()}.${this._mimetype.split("/")[1]}`;
        let file = new File([blob], filename, {
          type: this._mimetype,
          lastModified: Date.now(),
        });

        console.log("---- FILE ---- ", file);
      });

      this._mediaRecorder.start();
    }
  }

  stopRecorder() {
    if (this.isAvailable) {
      this.stop();
      this._mediaRecorder.stop();
    }
  }
}
