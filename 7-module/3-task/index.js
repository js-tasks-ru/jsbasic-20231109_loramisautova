import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = steps - 1;
    this.render();
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
    const sliderSteps = this.elem.querySelector('.slider__steps');

    for (let i = 0; i < this.steps; i++) {
      const sliderStep = document.createElement('span');
      sliderSteps.append(sliderStep);
    }

    this.elem.addEventListener('click', (event) => this.onClick(event));

    this.setValue();
    this.setClassName();
  }

  setValue = (value) => {
    this.value = value || 0;

    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');

    const valuePercents = this.value / this.segments * 100;

    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    this.setClassName();
  }

  setClassName = () => {
    const sliderSteps = this.elem.querySelector('.slider__steps');
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
