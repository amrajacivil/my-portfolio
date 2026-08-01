(function () {
  'use strict';

  const config = window.DIGITAL_FOOTPRINT_CONFIG;

  function formatNumber(value, decimals) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });

    return formatter.format(value);
  }

  function renderPlatformCard(platform) {
    const link = config.links[platform.linkKey] || '#';

    return `
      <article class="digital-card digital-platform-card fade-in">
        <div class="digital-card-header">
          <div class="digital-card-icon" aria-hidden="true">${platform.icon}</div>
          <a class="digital-external-link" href="${link}" target="_blank" rel="noopener noreferrer" aria-label="Open ${platform.name}">
            ↗
          </a>
        </div>
        <div class="digital-card-body">
          <h3 class="digital-card-title">${platform.name}</h3>
          <p class="digital-card-description">${platform.description}</p>
        </div>
        <a class="btn btn-secondary digital-visit-btn" href="${link}" target="_blank" rel="noopener noreferrer">
          ${platform.buttonLabel}
        </a>
      </article>
    `;
  }

  function renderMetricCard(metric) {
    return `
      <article class="digital-card digital-metric-card fade-in">
        <div class="metric-card-top">
          <div class="metric-icon" aria-hidden="true">${metric.icon}</div>
          <!-- <span class="metric-chip">Static</span> -->
        </div>
        <div class="metric-value" data-target="${metric.value}" data-decimals="${metric.decimals || 0}" data-suffix="${metric.suffix || ''}">0${metric.suffix || ''}</div>
        <div class="metric-title">${metric.title}</div>
      </article>
    `;
  }

  function renderHighlightItem(highlight, index) {
    return `
      <article class="digital-highlight-item fade-in fade-in-delay-${Math.min(index + 1, 3)}">
        <div class="digital-highlight-icon" aria-hidden="true">${highlight.icon}</div>
        <div class="digital-highlight-content">
          <h3 class="digital-highlight-title">${highlight.title}</h3>
          <p class="digital-highlight-description">${highlight.description}</p>
        </div>
      </article>
    `;
  }

  function animateCounter(element, target, decimals, suffix) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      element.textContent = `${formatNumber(target, decimals)}${suffix}`;
      return;
    }

    const duration = 1800;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = target * eased;
      element.textContent = `${formatNumber(currentValue, decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${formatNumber(target, decimals)}${suffix}`;
      }
    };

    requestAnimationFrame(step);
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (!config) return;

    const label = document.getElementById('digital-footprint-label');
    const title = document.getElementById('digital-footprint-title');
    const subtitle = document.getElementById('digital-footprint-subtitle');
    const presenceGrid = document.getElementById('digital-presence-grid');
    const metricsGrid = document.getElementById('digital-metrics-grid');
    const highlightsList = document.getElementById('digital-highlights-list');
    const quote = document.getElementById('digital-footprint-quote');

    if (label) label.textContent = config.page.label;
    if (title) title.textContent = config.page.title;
    if (subtitle) subtitle.textContent = config.page.subtitle;
    if (quote) quote.textContent = config.quote;

    if (presenceGrid) {
      presenceGrid.innerHTML = config.platforms.map(renderPlatformCard).join('');
    }

    if (metricsGrid) {
      metricsGrid.innerHTML = config.metrics.map(renderMetricCard).join('');
    }

    if (highlightsList) {
      highlightsList.innerHTML = config.highlights.map(renderHighlightItem).join('');
    }

    const fadeElements = document.querySelectorAll('.digital-footprint-page .fade-in');

    if (fadeElements.length > 0) {
      if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach((element) => fadeObserver.observe(element));
      } else {
        fadeElements.forEach((element) => element.classList.add('visible'));
      }
    }

    const metricValues = document.querySelectorAll('.metric-value');

    if (metricValues.length > 0) {
      const animateMetrics = () => {
        metricValues.forEach((element) => {
          const target = Number.parseFloat(element.dataset.target || '0');
          const decimals = Number.parseInt(element.dataset.decimals || '0', 10);
          const suffix = element.dataset.suffix || '';
          animateCounter(element, target, decimals, suffix);
        });
      };

      if ('IntersectionObserver' in window) {
        const metricsSection = document.querySelector('.digital-impact-section');

        if (metricsSection) {
          const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                animateMetrics();
                currentObserver.unobserve(entry.target);
              }
            });
          }, {
            threshold: 0.25
          });

          observer.observe(metricsSection);
        }
      } else {
        animateMetrics();
      }
    }
  });
})();