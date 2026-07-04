// ===== CULT.FIT PREMIUM REDESIGN 2026 - JavaScript =====

document.addEventListener('DOMContentLoaded', () => {

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  setTimeout(() => { loader.classList.add('hidden'); }, 2400);

  // ---- THEME TOGGLE ----
  const body = document.getElementById('body');
  const themeBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('cultfitTheme') || 'dark';
  if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
  themeBtn && themeBtn.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode');
    body.classList.toggle('light-mode', !isLight);
    body.classList.toggle('dark-mode', isLight);
    themeIcon.classList.toggle('fa-moon', isLight);
    themeIcon.classList.toggle('fa-sun', !isLight);
    localStorage.setItem('cultfitTheme', isLight ? 'dark' : 'light');
  });

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    navbar.classList.toggle('scrolled', curr > 50);
    lastScroll = curr;
  });

  // ---- BACK TO TOP ----
  const btt = document.getElementById('btt');
  window.addEventListener('scroll', () => {
    btt && btt.classList.toggle('show', window.scrollY > 400);
  });
  btt && btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- HAMBURGER MENU ----
  const hamBtn = document.getElementById('hamBtn');
  const navLinks = document.getElementById('navLinks');
  hamBtn && hamBtn.addEventListener('click', () => {
    hamBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks && navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamBtn.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ---- ACTIVE NAV LINK ----
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
    });
    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });

  // ---- SEARCH ----
  const searchBtn = document.getElementById('searchBtn');
  const searchOv = document.getElementById('searchOv');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  searchBtn && searchBtn.addEventListener('click', () => { searchOv.classList.toggle('open'); searchOv.classList.contains('open') && searchInput.focus(); });
  closeSearch && closeSearch.addEventListener('click', () => searchOv.classList.remove('open'));
  document.querySelectorAll('.search-tags span').forEach(tag => {
    tag.addEventListener('click', () => { searchInput.value = tag.textContent; searchInput.focus(); });
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') searchOv.classList.remove('open'); });

  // ---- FAB ----
  const fabMain = document.getElementById('fabMain');
  const fabMenu = document.getElementById('fabMenu');
  fabMain && fabMain.addEventListener('click', () => fabMenu.classList.toggle('open'));
  document.addEventListener('click', e => { if (fabMain && !fabMain.contains(e.target) && fabMenu && !fabMenu.contains(e.target)) fabMenu.classList.remove('open'); });

  // ---- PROGRAMS FILTER ----
  const filterBtns = document.querySelectorAll('.flt-btn');
  const progCards = document.querySelectorAll('.prog-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-f');
      progCards.forEach(card => {
        if (f === 'all' || card.getAttribute('data-t') === f) {
          card.style.display = '';
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });
    });
  });

  // ---- TESTIMONIALS CAROUSEL ----
  const track = document.getElementById('testiTrack');
  const prevBtn = document.getElementById('tPrev');
  const nextBtn = document.getElementById('tNext');
  const dotsWrap = document.getElementById('dots');
  const cards = track ? track.querySelectorAll('.tcard') : [];
  let currentSlide = 0;
  const getVisibleCount = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;

  function updateCarousel() {
    const visible = getVisibleCount();
    const maxSlide = Math.max(0, cards.length - visible);
    currentSlide = Math.min(currentSlide, maxSlide);
    if (track) {
      const cardWidth = track.querySelector('.tcard') ? track.querySelector('.tcard').offsetWidth : 0;
      const gap = 28;
      track.style.transform = "translateX(-" + (currentSlide * (cardWidth + gap)) + "px)";
    }
    document.querySelectorAll('#dots .dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  prevBtn && prevBtn.addEventListener('click', () => { if (currentSlide > 0) { currentSlide--; updateCarousel(); } });
  nextBtn && nextBtn.addEventListener('click', () => {
    const visible = getVisibleCount();
    const maxSlide = Math.max(0, cards.length - visible);
    if (currentSlide < maxSlide) { currentSlide++; updateCarousel(); }
  });
  dotsWrap && dotsWrap.querySelectorAll('.dot').forEach((dot, i) => {
    dot.addEventListener('click', () => { currentSlide = i; updateCarousel(); });
  });
  window.addEventListener('resize', updateCarousel);

  // Auto-slide testimonials
  setInterval(() => {
    const visible = getVisibleCount();
    const maxSlide = Math.max(0, cards.length - visible);
    currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
    updateCarousel();
  }, 5000);

  // ---- BILLING TOGGLE ----
  const billingToggle = document.getElementById('billingToggle');
  const priceAmts = document.querySelectorAll('.pamt');
  billingToggle && billingToggle.addEventListener('change', () => {
    const yearly = billingToggle.checked;
    priceAmts.forEach(el => {
      el.textContent = yearly ? el.getAttribute('data-y') : el.getAttribute('data-m');
    });
  });

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.fq').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.fitem').forEach(i => i.classList.remove('active'));
      document.querySelectorAll('.fq').forEach(b => b.setAttribute('aria-expanded', 'false'));
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- SCROLL ANIMATIONS ----
  const animElements = document.querySelectorAll('.sec-hdr, .cat-card, .prog-card, .price-card, .care-card, .tcard, .scard, .bcard, .sitem, .fitem, .ci, .af, .amb-body, .hero-text, .app-left');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animElements.forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });

  // ---- ANIMATED COUNTERS ----
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count')) || 0;
    const isDec = el.getAttribute('data-dec') === 'true';
    const suffix = el.getAttribute('data-suf') || '';
    const duration = 2000;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      if (isDec) {
        el.textContent = (current / 10).toFixed(1) + suffix;
      } else if (target >= 1000000) {
        el.textContent = (current / 1000000).toFixed(0) + 'M+';
      } else if (target >= 1000) {
        el.textContent = (current >= 1000 ? current.toLocaleString() : current) + suffix;
      } else {
        el.textContent = current + suffix;
      }
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.snum, .ach-num, .hnum').forEach(el => counterObserver.observe(el));

  // Hero stats counter (simple)
  document.querySelectorAll('.hnum').forEach(el => {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(el.getAttribute('data-count'));
          const unit = el.nextElementSibling ? el.nextElementSibling.textContent : '';
          let start = 0;
          const dur = 2000;
          const t0 = Date.now();
          const step = () => {
            const elapsed = Date.now() - t0;
            const p = Math.min(elapsed / dur, 1);
            start = Math.floor((1 - Math.pow(1 - p, 3)) * target);
            el.textContent = start;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      });
    }, { threshold: 0.5 });
    heroObserver.observe(el);
  });

  // ---- CONTACT FORM ----
  const cForm = document.getElementById('cForm');
  cForm && cForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = cForm.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent!';
    btn.style.background = '#4ade80';
    setTimeout(() => { btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>'; btn.style.background = ''; }, 3000);
  });

  // ---- NEWSLETTER FORM ----
  const nlForm = document.getElementById('nlForm');
  nlForm && nlForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = nlForm.querySelector('button');
    btn.textContent = 'Subscribed!';
    btn.style.background = '#4ade80';
    setTimeout(() => { btn.innerHTML = 'Subscribe <i class="fas fa-arrow-right"></i>'; btn.style.background = ''; }, 3000);
  });

  // ---- SMOOTH SCROLL FOR NAV LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ---- SVG GRADIENT FOR RING CHART ----
  const svgNS = 'http://www.w3.org/2000/svg';
  document.querySelectorAll('.rsvg').forEach(svg => {
    const defs = document.createElementNS(svgNS, 'defs');
    const grad = document.createElementNS(svgNS, 'linearGradient');
    grad.setAttribute('id', 'grad1');
    const s1 = document.createElementNS(svgNS, 'stop');
    s1.setAttribute('offset', '0%'); s1.setAttribute('stop-color', '#6c63ff');
    const s2 = document.createElementNS(svgNS, 'stop');
    s2.setAttribute('offset', '100%'); s2.setAttribute('stop-color', '#ff6b6b');
    grad.appendChild(s1); grad.appendChild(s2);
    defs.appendChild(grad); svg.appendChild(defs);
  });

  console.log('%ccult.fit Premium Redesign 2026', 'font-size:18px;font-weight:900;background:linear-gradient(135deg,#6c63ff,#ff6b6b);-webkit-background-clip:text;color:transparent;padding:4px;');
  console.log('UI/UX Case Study - Educational Purpose Only');
});
