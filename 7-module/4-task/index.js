import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
    this.addEventListeners();
  }

  createRootElement() {
    return createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>
        <div class="slider__progress"></div>
        <div class="slider__steps"></div>
      </div>
    `);
  }

  render() {
    this.elem = this.createRootElement();
    const sliderSteps = this.getSliderElement('steps');

    for (let i = 0; i < this.steps; i++) {
      const sliderStep = document.createElement('span');
      sliderSteps.append(sliderStep);
    }

    this.setValue();
    this.setClassName();
  }

  getSliderElement = (selector) => {
    return this.elem.querySelector(`.slider__${selector}`);
  }

  addEventListeners = () => {
    const thumb = this.getSliderElement('thumb');

    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', this.onMouseDown);
    this.elem.addEventListener('click', (event) => this.onClick(event));
  }

  onMouseDown = () => {
    this.elem.classList.add('slider_dragging');

    document.addEventListener('pointermove', this.onMouseMove);
    document.addEventListener('pointerup', this.onMouseUp, { once: true });
  }

  onMouseMove = ({ clientX }) => {
    const thumb = this.getSliderElement('thumb');
    const progress = this.getSliderElement('progress');

    let leftRelative = (clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let leftPercents = leftRelative * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    this.value = Math.round(leftRelative * this.segments);

    this.setClassName();
  }

  onMouseUp = () => {
    document.removeEventListener('pointermove', this.onMouseMove);
    this.elem.classList.remove('slider_dragging');

    this.getSliderElement('thumb').style.left = `${(this.value / this.segments) * 100}%`;
    this.getSliderElement('progress').style.width = `${(this.value / this.segments) * 100}%`;

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }));
  }

  setValue = (value) => {
    this.value = value || 0;

    const thumb = this.getSliderElement('thumb');
    const progress = this.getSliderElement('progress');

    const valuePercents = this.value / this.segments * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.setClassName();
  }

  setClassName = () => {
    const sliderSteps = this.getSliderElement('steps');
    const currentActiveStep = sliderSteps.querySelector('.slider__step-active');

    if (currentActiveStep) {
      currentActiveStep.classList.remove('.slider__step-active');
    }

    sliderSteps.children[this.value].classList.add('slider__step-active');
  }

  onClick = (event) => {
    const leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;

    const approximateValue = leftRelative * this.segments;
    const value = Math.round(approximateValue);

    this.setValue(value);

    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true,
    }));
  }
}
