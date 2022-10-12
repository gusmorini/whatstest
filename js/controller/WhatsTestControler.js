class WhatsTest {
  constructor() {
    console.log("WHATSTEST");
    this.loadElements();
  }

  /**
   * carrega todos elementos com id do dom
   * e formata nomes id em camel case
   */
  loadElements() {
    this.el = {};
    document.querySelectorAll("[id").forEach((element) => {
      this.el[Format.getElementCase(element.id)] = element;
    });
  }
}
