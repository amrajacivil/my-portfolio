(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.getElementById('lifeEventsViewport');
    const track = document.getElementById('lifeEventsTrack');
    const prevButton = document.querySelector('.life-nav-prev');
    const nextButton = document.querySelector('.life-nav-next');

    if (!viewport || !track) return;

    const originalCards = Array.from(track.children);
    if (originalCards.length === 0) return;

    originalCards.forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    let rafId = null;
    let isPaused = false;
    const autoSpeed = 0.55;

    function step() {
      if (!isPaused) {
        viewport.scrollLeft += autoSpeed;

        const loopPoint = track.scrollWidth / 2;
        if (viewport.scrollLeft >= loopPoint) {
          viewport.scrollLeft = 0;
        }
      }

      rafId = window.requestAnimationFrame(step);
    }

    function startAutoScroll() {
      if (rafId) return;
      rafId = window.requestAnimationFrame(step);
    }

    function stopAutoScroll() {
      if (!rafId) return;
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    function scrollByCard(direction) {
      const firstCard = track.querySelector('.life-event-card');
      if (!firstCard) return;

      const gapValue = window.getComputedStyle(track).gap;
      const gap = Number.parseFloat(gapValue) || 0;
      const distance = firstCard.offsetWidth + gap;
      viewport.scrollBy({ left: direction * distance, behavior: 'smooth' });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        isPaused = true;
        scrollByCard(-1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        isPaused = true;
        scrollByCard(1);
      });
    }

    viewport.addEventListener('mouseenter', () => {
      isPaused = true;
    });

    viewport.addEventListener('mouseleave', () => {
      isPaused = false;
    });

    viewport.addEventListener('touchstart', () => {
      isPaused = true;
    }, { passive: true });

    viewport.addEventListener('touchend', () => {
      isPaused = false;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoScroll();
      } else {
        startAutoScroll();
      }
    });

    startAutoScroll();
  });
})();
