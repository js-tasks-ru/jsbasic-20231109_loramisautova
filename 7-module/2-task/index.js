import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`
        <div class="modal">
            <div class="modal__overlay"></div>

            <div class="modal__inner">
              <div class="modal__header">
                <button type="button" class="modal__close">
                  <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
                </button>

                <h3 class="modal__title"></h3>
              </div>

              <div class="modal__body"></div>
            </div>
        </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');

    this.elem.addEventListener('click', (event) => this.onClick(event));
    document.addEventListener('keydown', (event) => this.onKeyDown(event));
  }

  getModalElement = (selector) => {
    return this.elem.querySelector(`.modal__${selector}`);
  }

  setTitle(title) {
    const modalTitle = this.getModalElement('title');
    modalTitle.textContent = `${title}`;
  }

  setBody(node) {
    const modalBody = this.getModalElement('body');
    modalBody.innerHTML = '';
    modalBody.append(node);
  }

  onClick = (event) => {
    const modalClose = event.target.closest('.modal__close');

    if (modalClose) {
      this.close();
    }
  }

  close = () => {
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  onKeyDown = (event) => {
    if (event.code === 'Escape') {
      document.body.classList.remove('is-modal-open');
      this.elem.remove();
    }
  }
}
