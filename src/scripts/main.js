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

  // 4. Video Lightbox Modal Interactivity (Supports MP4 & YouTube Embeds)
  const videoModal = document.getElementById('videoModal');
  const modalContainer = document.getElementById('modalContainer');
  const closeVideoModal = document.getElementById('closeVideoModal');
  const modalVideoPlayer = document.getElementById('modalVideoPlayer');
  const modalIframePlayer = document.getElementById('modalIframePlayer');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoCategory = document.getElementById('modalVideoCategory');
  const videoCards = document.querySelectorAll('.bento-video-card, .bento-card');

  const openVideoModal = ({ videoSrc, ytId, aspect, title, category }) => {
    if (!videoModal) return;

    // Reset aspect classes
    modalContainer?.classList.remove('aspect-9x16');
    if (aspect === '9-16') {
      modalContainer?.classList.add('aspect-9x16');
    }

    if (modalVideoTitle) modalVideoTitle.textContent = title || 'PROJECT VIDEO';
    if (modalVideoCategory) modalVideoCategory.textContent = category || 'AI VIDEO';

    if (ytId) {
      // YouTube embed mode
      if (modalVideoPlayer) {
        modalVideoPlayer.pause();
        modalVideoPlayer.style.display = 'none';
        modalVideoPlayer.src = '';
      }
      if (modalIframePlayer) {
        modalIframePlayer.style.display = 'block';
        modalIframePlayer.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
      }
    } else if (videoSrc) {
      // MP4 video mode
      if (modalIframePlayer) {
        modalIframePlayer.style.display = 'none';
        modalIframePlayer.src = '';
      }
      if (modalVideoPlayer) {
        modalVideoPlayer.style.display = 'block';
        modalVideoPlayer.src = videoSrc;
        modalVideoPlayer.play().catch(err => console.log('Autoplay blocked:', err));
      }
    }

    videoModal.classList.add('active');
  };

  const closeVideo = () => {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    modalContainer?.classList.remove('aspect-9x16');
    if (modalVideoPlayer) {
      modalVideoPlayer.pause();
      modalVideoPlayer.src = '';
    }
    if (modalIframePlayer) {
      modalIframePlayer.src = '';
      modalIframePlayer.style.display = 'none';
    }
  };

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const ytId = card.getAttribute('data-yt-id');
      const aspect = card.getAttribute('data-aspect');
      const videoElem = card.querySelector('video');
      const titleElem = card.querySelector('.bento-item-title');
      const catElem = card.querySelector('.bento-category');

      const title = titleElem ? titleElem.textContent : 'AI VIDEO PROJECT';
      const category = catElem ? catElem.textContent : 'FEATURED PROJECT';

      if (ytId) {
        openVideoModal({ ytId, aspect, title, category });
      } else if (videoElem && videoElem.src) {
        const videoSrc = videoElem.getAttribute('src') || videoElem.src;
        openVideoModal({ videoSrc, aspect, title, category });
      }
    });
  });

  closeVideoModal?.addEventListener('click', closeVideo);

  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
      closeVideo();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal?.classList.contains('active')) {
      closeVideo();
    }
  });

  console.log('✨ Scroll Reveal & Video Lightbox Modal initialized successfully');
});
