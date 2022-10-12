class Format {
  /**
   * método transforma texto em camelcase
   * ex: meu-elemento -> meuElemento
   */
  static getElementCase(text) {
    let div = document.createElement("div");
    div.innerHTML = `<p data-${text}="banana"></p>`;
    return Object.keys(div.firstChild.dataset)[0];
  }
}
