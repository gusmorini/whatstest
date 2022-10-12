class WhatsTest {
  constructor() {
    /**
     * métodos Element.prototype
     * para facilitar o desenvolvimento
     */
    this.elementsPrototype();
    /**
     * método para carregar todos os
     * elementos com id do DOM e formatar
     * nomes em camel case
     */
    this.loadElements();
    /**
     * método adiciona eventos aos elementos iniciais
     */
    this.initEvents();
  }

  loadElements() {
    this.el = {};
    document.querySelectorAll("[id").forEach((element) => {
      this.el[Format.getElementCase(element.id)] = element;
    });
  }

  elementsPrototype() {
    /** oculta o elemento */
    Element.prototype.hide = function () {
      this.style.display = "none";
      return this;
    };
    /** mostra o elemento */
    Element.prototype.show = function () {
      this.style.display = "block";
      return this;
    };
    /** faz um toogle entre o hide e o show */
    Element.prototype.toggle = function () {
      this.style.display = this.style.display === "none" ? "block" : "none";
      return this;
    };
    /** metodo de vários eventos
     * recebe os eventos separados por ","
     * ex: this.on('click, dblclick', fn)
     */
    Element.prototype.on = function (events, fn) {
      events.split(",").forEach((event) => {
        this.addEventListener(event, fn);
      });
      return this;
    };
    /** método manipular style css
     * ex: this.css({ background: 'red', width: '50% })
     */
    Element.prototype.css = function (styles) {
      for (const name in styles) {
        this.style[name] = styles[name];
      }
      return this;
    };
    /* méotodo adicionar class */
    Element.prototype.addClass = function (name) {
      this.classList.add(name);
      return this;
    };
    /** método remove class */
    Element.prototype.removeClass = function (name) {
      this.classList.remove(name);
      return this;
    };
    /** método toogle class */
    Element.prototype.toggleClass = function (name) {
      this.classList.toggle(name);
      return this;
    };
    /** método verifica se a classe existe no elemento */
    Element.prototype.hasClass = function (name) {
      return this.classList.contains(name);
    };
  }

  initEvents() {
    /** mostra painel editar profile */
    this.el.myPhoto.on("click", (e) => {
      this.closeAllPanelLeft();
      this.el.panelEditProfile.show();
      setTimeout(() => this.el.panelEditProfile.addClass("open"), 300);
    });
    /** oculta painel editar profile */
    this.el.btnClosePanelEditProfile.on("click", (e) => {
      this.el.panelEditProfile.removeClass("open");
    });
    /** mostra painel adicionar contact */
    this.el.btnNewContact.on("click", (e) => {
      this.closeAllPanelLeft();
      this.el.panelAddContact.show();
      setTimeout(() => this.el.panelAddContact.addClass("open"), 300);
    });
    /** oculta painel adicionar contact */
    this.el.btnClosePanelAddContact.on("click", (e) => {
      this.el.panelAddContact.removeClass("open");
    });
  }
  /** oculta todos os paineis laterais */
  closeAllPanelLeft() {
    this.el.panelEditProfile.hide();
    this.el.panelAddContact.hide();
  }
}
