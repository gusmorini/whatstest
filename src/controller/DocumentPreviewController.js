import pdfjs from "pdfjs-dist";
import path from "path";

pdfjs.GlobalWorkerOptions.workerSrc = path.resolve(
  __dirname,
  "../../dist/pdf.worker.bundle.js"
);

export default class DocumentPreviewController {
  constructor(file) {
    this._file = file;
    this._ext = file.name.split(".")[1];
  }

  getPreviewData() {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      switch (this._ext) {
        case "png":
        case "jpeg":
        case "jpg":
        case "gif":
          reader.onload = (e) =>
            resolve({
              src: reader.result,
              name: this._file.name,
              ext: this._ext,
              preview: true,
            });
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(this._file);
          break;

        case "pdf":
          reader.onload = (e) => {
            pdfjs
              .getDocument(new Uint8Array(reader.result))
              .then((pdf) => {
                pdf
                  .getPage(1)
                  .then((page) => {
                    let viewport = page.getViewport(1);
                    let canvas = document.createElement("canvas");
                    let canvasContext = canvas.getContext("2d");
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    page
                      .render({
                        canvasContext,
                        viewport,
                      })
                      .then(() =>
                        resolve({
                          src: canvas.toDataURL("image/png"),
                          name: `${pdf.numPages} página${
                            pdf.numPages.lenght > 1 ? "s" : ""
                          }`,
                          preview: true,
                        })
                      )
                      .catch((err) => reject(err));
                  })
                  .catch((err) => reject(err));
              })
              .catch((err) => reject(err));
          };
          reader.readAsArrayBuffer(this._file);
          break;

        default:
          resolve({
            src: null,
            name: this._file.name,
            ext: this._ext,
          });
      }
    });
  }
}
