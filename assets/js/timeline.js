(function () {
  'use strict';

  const AUTOPLAY_INTERVAL = 5000; // ms between auto-advances
  let currentIndex = 0;
  let autoplayTimer = null;
  let isPlaying = true;
  let touchStartX = 0;
  let touchEndX = 0;

  // DOM elements
  const wrapper = document.querySelector('.htimeline-wrapper');
  if (!wrapper) return;

  const years = wrapper.querySelectorAll('.htimeline-year');
  const cards = wrapper.querySelectorAll('.htimeline-card');
  const track = wrapper.querySelector('.htimeline-cards-track');
  const progressBar = wrapper.querySelector('.htimeline-line-progress');
  const indicators = wrapper.querySelectorAll('.htimeline-indicator');
  const prevBtn = wrapper.querySelector('.htimeline-nav-prev');
  const nextBtn = wrapper.querySelector('.htimeline-nav-next');
  const autoplayBtn = wrapper.querySelector('.htimeline-autoplay');
  const playIcon = wrapper.querySelector('.htimeline-autoplay-icon.playing');
  const pauseIcon = wrapper.querySelector('.htimeline-autoplay-icon.paused');

  const totalItems = cards.length;

  function goTo(index) {
    if (index < 0 || index >= totalItems) return;
    currentIndex = index;

    // Slide the track
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update year markers
    years.forEach((y, i) => {
      y.classList.toggle('active', i === currentIndex);
    });

    // Update cards
    cards.forEach((c, i) => {
      c.classList.toggle('active', i === currentIndex);
    });

    // Update indicators
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === currentIndex);
    });

    // Update progress bar
    const progress = totalItems > 1 ? (currentIndex / (totalItems - 1)) * 100 : 0;
    progressBar.style.width = progress + '%';

    // Update nav button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === totalItems - 1;
  }

  function next() {
    if (currentIndex < totalItems - 1) {
      goTo(currentIndex + 1);
    } else {
      goTo(0); // loop back
    }
  }

  function prev() {
    if (currentIndex > 0) {
      goTo(currentIndex - 1);
    } else {
      goTo(totalItems - 1);
    }
  }

  // Autoplay
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, AUTOPLAY_INTERVAL);
    isPlaying = true;
    if (playIcon) playIcon.style.display = '';
    if (pauseIcon) pauseIcon.style.display = 'none';
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    isPlaying = false;
    if (playIcon) playIcon.style.display = 'none';
    if (pauseIcon) pauseIcon.style.display = '';
  }

  function toggleAutoplay() {
    if (isPlaying) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAutoplay(); });
  if (autoplayBtn) autoplayBtn.addEventListener('click', toggleAutoplay);

  years.forEach((y) => {
    y.addEventListener('click', () => {
      const idx = parseInt(y.dataset.index, 10);
      goTo(idx);
      stopAutoplay();
    });
  });

  indicators.forEach((ind) => {
    ind.addEventListener('click', () => {
      const idx = parseInt(ind.dataset.index, 10);
      goTo(idx);
      stopAutoplay();
    });
  });

  // Touch / swipe support
  wrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  wrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        next();
      } else {
        prev();
      }
      stopAutoplay();
    }
  }, { passive: true });

  // Keyboard support
  wrapper.setAttribute('tabindex', '0');
  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); stopAutoplay(); }
    if (e.key === 'ArrowLeft') { prev(); stopAutoplay(); }
  });

  // Pause on hover
  wrapper.addEventListener('mouseenter', () => {
    if (isPlaying) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  });

  wrapper.addEventListener('mouseleave', () => {
    if (isPlaying) {
      autoplayTimer = setInterval(next, AUTOPLAY_INTERVAL);
    }
  });

  // Pause when not in viewport (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && isPlaying && !autoplayTimer) {
        autoplayTimer = setInterval(next, AUTOPLAY_INTERVAL);
      } else if (!entry.isIntersecting && autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    });
  }, { threshold: 0.3 });

  observer.observe(wrapper);

  // Initialize
  goTo(0);
  startAutoplay();

})();