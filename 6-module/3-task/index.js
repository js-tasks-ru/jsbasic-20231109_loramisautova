import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.offset = 0;
    this.render();
    this.addEventListeners();
  }

  createCarouselElement() {
    return createElement(`
        <div class="carousel">
          <div class="carousel__arrow carousel__arrow_right">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </div>
          <div class="carousel__arrow carousel__arrow_left">
              <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
          </div>
          <div class="carousel__inner"></div>
        </div>
  `);
  }

  createSlideElement(slide) {
    return createElement(`
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
  }

  getCarouselElement(selector) {
    return this.elem.querySelector(`.carousel__${selector}`);
  }

  render() {
    this.elem = this.createCarouselElement();
    const slideElements = this.slides.map(slide => this.createSlideElement(slide));

    this.getCarouselElement('inner').append(...slideElements);
    this.updateButtonVisibility(0);

    return this.elem;
  }

  addEventListeners() {
    this.elem.onclick = (event) => {
      let button = event.target.closest('.carousel__button');

      if (button) {
        let id = event.target.closest('[data-id]').dataset.id;
        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: id,
          bubbles: true,
        }));
      }
    };

    this.getCarouselElement('arrow_right').addEventListener('click', () => this.shiftSlide(-1));
    this.getCarouselElement('arrow_left').addEventListener('click', () => this.shiftSlide(1));
  }

  shiftSlide(step) {
    let carouselWidth = this.getCarouselElement('inner').offsetWidth;
    this.offset += carouselWidth * step;
    this.getCarouselElement('inner').style.transform = `translateX(${this.offset}px)`;

    let currentSlide = Math.abs(this.offset / carouselWidth);
    this.updateButtonVisibility(currentSlide);
  }

  updateButtonVisibility(currentSlide) {
    this.getCarouselElement('arrow_left').style.display = currentSlide === 0 ? 'none' : '';
    this.getCarouselElement('arrow_right').style.display = currentSlide === this.slides.length - 1 ? 'none' : '';
  }
}
