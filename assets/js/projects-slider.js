/**
 * Projects Slider
 * Handles the navigation and display of project cards in a carousel/slider format
 */

class ProjectsSlider {
  constructor() {
    this.currentSlide = 0;
    this.slidesTrack = document.querySelector('.projects-slides-track');
    this.slides = document.querySelectorAll('.projects-slide');
    this.prevBtn = document.querySelector('.projects-nav-prev');
    this.nextBtn = document.querySelector('.projects-nav-next');
    this.indicators = document.querySelectorAll('.projects-indicator');
    
    if (!this.slidesTrack || this.slides.length === 0) {
      console.warn('Projects slider elements not found');
      return;
    }

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.updateIndicators();
  }

  attachEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.goToSlide(index));
    });

    // Optional: Add keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft' && this.isSliderInViewport()) {
        this.prevSlide();
      } else if (e.key === 'ArrowRight' && this.isSliderInViewport()) {
        this.nextSlide();
      }
    });
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.updateSlider();
  }

  nextSlide() {
    this.currentSlide = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
    this.updateSlider();
  }

  goToSlide(index) {
    this.currentSlide = index;
    this.updateSlider();
  }

  updateSlider() {
    const offset = -this.currentSlide * 100;
    this.slidesTrack.style.transform = `translateX(${offset}%)`;
    this.updateIndicators();
  }

  updateIndicators() {
    this.indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  isSliderInViewport() {
    const rect = this.slidesTrack.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Initialize slider when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ProjectsSlider();
});
