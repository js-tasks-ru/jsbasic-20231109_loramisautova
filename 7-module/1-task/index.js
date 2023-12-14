import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.render();
    this.addEventListeners();
  }

  createRootElement() {
    return createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);
  }

  createListElement({ id, name }) {
    return createElement(`<a href="#" class="ribbon__item" data-id="${id}">${name}</a>`);
  }

  render() {
    this.elem = this.createRootElement();
    const ribbonInner = this.getScrollElement('inner');
    ribbonInner.append(...this.categories.map(category => this.createListElement(category)));
  }

  getScrollElement(selector) {
    return this.elem.querySelector(`.ribbon__${selector}`);
  }

  addEventListeners() {
    this.getScrollElement('arrow_right').addEventListener('click', () => this.onButtonClick(1));
    this.getScrollElement('arrow_left').addEventListener('click', () => this.onButtonClick(-1));
    this.getScrollElement('inner').addEventListener('scroll', () => this.onScroll());
    this.elem.addEventListener('click', (event) => {
      const currItem = event.target.closest('.ribbon__item');
      if (currItem) {
        this.onItemClick(currItem);
        event.preventDefault();
      }
    });
  }

  onItemClick = (currItem) => {
    const prevItem = this.getScrollElement('item_active');
    if (prevItem) {
      prevItem.classList.remove('ribbon__item_active');
    }
    currItem.classList.add('ribbon__item_active');

    this.elem.dispatchEvent(
      new CustomEvent('ribbon-select', {
        detail: currItem.dataset.id,
        bubbles: true
      })
    );
  }

  onScroll() {
    this.updateScrollButton();
  }

  onButtonClick(direction) {
    const scrollStep = 350;
    this.getScrollElement('inner').scrollBy(scrollStep * direction, 0);
    this.updateScrollButton();
  }

  scrollLeft() {
    return this.getScrollElement('inner').scrollLeft;
  }

  scrollRight() {
    const scrollWidth = this.getScrollElement('inner').scrollWidth;
    const scrollLeft = this.getScrollElement('inner').scrollLeft;
    const clientWidth = this.getScrollElement('inner').clientWidth;

    return scrollWidth - scrollLeft - clientWidth;
  }

  updateScrollButton() {
    if (this.scrollLeft() > 0) {
      this.getScrollElement('arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.getScrollElement('arrow_left').classList.remove('ribbon__arrow_visible');
    }

    const scrollRight = this.scrollRight() < 1 ? 0 : this.scrollRight();
    if (scrollRight < 1) {
      this.getScrollElement('arrow_right').classList.remove('ribbon__arrow_visible');
    } else {
      this.getScrollElement('arrow_right').classList.add('ribbon__arrow_visible');
    }
  }
}
