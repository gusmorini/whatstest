export default class DocumentPreviewController {
  constructor(file) {
    this._file = file;
    this._ext = file.name.split(".")[1];
  }

  getPreviewData() {
    return new Promise((resolve, reject) => {
      switch (this._ext) {
        case "png":
        case "jpeg":
        case "jpg":
        case "gif":
          let reader = new FileReader();
          reader.onload = (e) =>
            resolve({
              url: reader.result,
              name: this._file.name,
              ext: this._ext,
              preview: true,
            });
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(this._file);
          break;

        case "pdf":
          console.log("TYPE PDF");
          break;

        default:
          resolve({
            url: null,
            name: this._file.name,
            ext: this._ext,
          });
      }
    });
  }
}
