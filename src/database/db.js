import firebase from "firebase/app";
import "firebase/firestore";

export class Database {
  constructor() {
    this._config = {
      apiKey: "AIzaSyD55wniW_uky-iZq0whh-TipooT0lApDAE",
      authDomain: "whatsapp-test-8919a.firebaseapp.com",
      projectId: "whatsapp-test-8919a",
      storageBucket: "whatsapp-test-8919a.appspot.com",
      messagingSenderId: "1072722289248",
      appId: "1:1072722289248:web:6befaf1ed5337401cc9905",
      measurementId: "G-QGSB519P3E",
    };
    this.init();
  }

  init() {
    if (!this._initialized) {
      firebase.initializeApp(this._config);

      /**
       * comando depreciado, procurar sobre
       * firebase.firestore().settings({
       *  timestampsInSnapshots:true
       * })
       */

      this._initialized = true;
    }
  }

  static db() {
    return firebase.firestore();
  }

  static hd() {
    return firebase.storage();
  }
}
