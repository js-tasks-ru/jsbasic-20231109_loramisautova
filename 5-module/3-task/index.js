function initCarousel() {
  const rightButton = document.querySelector('.carousel__arrow_right');
  const leftButton = document.querySelector('.carousel__arrow_left');
  const carousel = document.querySelector('.carousel__inner');

  let carouselWidth = carousel.offsetWidth;
  let offset = 0;

  function updateButtonVisibility(currenSlide) {
    leftButton.style.display = currenSlide === 0 ? 'none' : '';
    rightButton.style.display = currenSlide === 3 ? 'none' : '';
  }

  function shiftSlide(step) {
    offset += carouselWidth * step;
    carousel.style.transform = `translateX(${offset}px)`;

    let currenSlide = Math.abs(offset / carouselWidth);
    updateButtonVisibility(currenSlide);
  }

  rightButton.addEventListener(('click'), () => shiftSlide(-1));
  leftButton.addEventListener(('click'), () => shiftSlide(1));

  updateButtonVisibility(0);
}
