(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('lifeCarouselViewport');
    const track = document.getElementById('lifeCarouselTrack');
    const prevBtn = document.querySelector('.life-nav-prev');
    const nextBtn = document.querySelector('.life-nav-next');

    if (!viewport || !track) return;

    // Clone cards for seamless looping
    const cards = Array.from(track.querySelectorAll('.life-milestone-card'));
    if (cards.length === 0) return;

    cards.forEach((card) => {
      const clone = card.cloneNode(true);
      track.appendChild(clone);
    });

    const cardWidth = cards[0].offsetWidth;
    const gap = 24;
    const cardFullWidth = cardWidth + gap;
    const totalWidth = track.scrollWidth / 2;

    // Manual navigation
    function scrollToPosition(distance) {
      viewport.scrollBy({
        left: distance,
        behavior: 'smooth'
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        scrollToPosition(-cardFullWidth);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        scrollToPosition(cardFullWidth);
      });
    }

    // Pause auto-scroll on interaction
    let isPaused = false;

    viewport.addEventListener('mouseenter', () => {
      isPaused = true;
      track.style.animationPlayState = 'paused';
    });

    viewport.addEventListener('mouseleave', () => {
      isPaused = false;
      track.style.animationPlayState = 'running';
    });

    viewport.addEventListener('touchstart', () => {
      isPaused = true;
      track.style.animationPlayState = 'paused';
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      isPaused = false;
      track.style.animationPlayState = 'running';
    }, { passive: true });

    // Reset scroll position when it reaches the end
    viewport.addEventListener('scroll', () => {
      if (viewport.scrollLeft >= totalWidth - 10) {
        viewport.scrollLeft = 0;
      }
    });

    // Pause animation when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        track.style.animationPlayState = 'paused';
      } else if (!isPaused) {
        track.style.animationPlayState = 'running';
      }
    });
  });
})();
