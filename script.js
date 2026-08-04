document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. THEME SWITCHER (DARK MODE BY DEFAULT)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const htmlElement = document.documentElement;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('km_portfolio_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('km_portfolio_theme', newTheme);
    });
  }

  /* ==========================================================================
     2. MOBILE MENU DRAWER TOGGLE
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksWrapper = document.getElementById('navLinksWrapper');

  if (mobileMenuBtn && navLinksWrapper) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksWrapper.classList.toggle('active');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinksWrapper.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     3. EVENTS HORIZONTAL CAROUSEL CONTROLLER
     ========================================================================== */
  const carouselTrack = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const cardItems = document.querySelectorAll('.carousel-card-item');

  if (carouselTrack && cardItems.length > 0) {
    let currentIndex = 0;

    // Helper: calculate visible cards based on screen width
    function getVisibleCount() {
      const width = window.innerWidth;
      if (width > 1024) return 3;
      if (width > 768) return 2;
      return 1;
    }

    // Helper: calculate max index
    function getMaxIndex() {
      const visible = getVisibleCount();
      return Math.max(0, cardItems.length - visible);
    }

    // Render dot indicators
    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const maxIdx = getMaxIndex();

      for (let i = 0; i <= maxIdx; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }

    // Update track position and dot states
    function updateCarousel() {
      const maxIdx = getMaxIndex();
      if (currentIndex > maxIdx) currentIndex = maxIdx;
      if (currentIndex < 0) currentIndex = 0;

      const visible = getVisibleCount();
      // Calculate offset width
      const cardWidth = cardItems[0].getBoundingClientRect().width;
      const gap = 24; // 1.5rem gap in px
      const offset = currentIndex * (cardWidth + gap);

      carouselTrack.style.transform = `translateX(-${offset}px)`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', idx === currentIndex);
        });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        updateCarousel();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const maxIdx = getMaxIndex();
        currentIndex = Math.min(maxIdx, currentIndex + 1);
        updateCarousel();
      });
    }

    // Initial render & window resize handler
    renderDots();
    updateCarousel();

    window.addEventListener('resize', () => {
      renderDots();
      updateCarousel();
    });
  }

  /* ==========================================================================
     4. CONTACT FORM & SUCCESS STATE TOGGLE
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const contactSuccessState = document.getElementById('contactSuccessState');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');

  if (contactForm && contactSuccessState) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Transition from form to Success State
      contactForm.style.display = 'none';
      contactSuccessState.classList.add('active');
    });

    if (sendAnotherBtn) {
      sendAnotherBtn.addEventListener('click', () => {
        contactForm.reset();
        contactSuccessState.classList.remove('active');
        contactForm.style.display = 'block';
      });
    }
  }

  /* ==========================================================================
     5. SCROLL SPY ACTIVE NAVBAR LINK HIGHLIGHTER
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);
});
