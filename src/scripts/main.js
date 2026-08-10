// Main Interactivity & Scroll Reveal Animation Script for Thach Nhut Hao Portfolio

document.addEventListener('DOMContentLoaded', () => {
  // 1. Floating Help Widget Toggle
  const helpWidget = document.getElementById('helpWidget');
  const widgetBtn = helpWidget?.querySelector('.widget-btn');
  const widgetPopover = document.getElementById('widgetPopover');

  widgetBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    widgetPopover?.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!helpWidget?.contains(e.target)) {
      widgetPopover?.classList.remove('active');
    }
  });

  // 2. Scroll Indicator Click to Scroll Down smoothly
  const scrollIndicator = document.querySelector('.scroll-indicator');
  scrollIndicator?.addEventListener('click', () => {
    const metricsSection = document.getElementById('metrics');
    metricsSection?.scrollIntoView({ behavior: 'smooth' });
  });

  // 3. High-Performance Intersection Observer for Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserverOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  console.log('✨ Scroll Reveal Animations initialized successfully');
});
