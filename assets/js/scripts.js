// Header scroll effect
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile menu toggle — rayas siempre paralelas
const toggle = document.querySelector('.mobile-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
if (toggle && mobileMenu) {
  toggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Envío real de formularios de contacto vía Formspree
const contactForms = document.querySelectorAll('.contact-form');
contactForms.forEach(contactForm => {
  const formBtn = contactForm.querySelector('.form-submit-btn');
  const status = contactForm.querySelector('.form-status');
  const defaultText = formBtn ? formBtn.textContent : 'Enviar solicitud';

  const setStatus = (message, type = '') => {
    if (!status) return;
    status.textContent = message;
    status.classList.remove('is-success', 'is-error');
    if (type) status.classList.add(`is-${type}`);
  };

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    setStatus('');

    let valid = true;
    contactForm.querySelectorAll('input[required], textarea[required], select[required]').forEach(el => {
      const ok = el.value.trim().length > 0;
      el.style.borderColor = ok ? '' : '#E05050';
      if (!ok) valid = false;
    });

    if (!valid) {
      setStatus('Completa los campos obligatorios para enviar la solicitud.', 'error');
      return;
    }

    if (formBtn) {
      formBtn.disabled = true;
      formBtn.textContent = 'Enviando...';
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method || 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('Formspree no confirmó el envío');

      contactForm.reset();
      contactForm.querySelectorAll('input, textarea, select').forEach(el => {
        el.style.borderColor = '';
      });
      setStatus('Solicitud enviada correctamente. Te contactaremos en 24 horas hábiles.', 'success');
      if (formBtn) formBtn.textContent = 'Solicitud enviada ✓';
    } catch (error) {
      setStatus('No se pudo enviar la solicitud. Intenta nuevamente o agenda por WhatsApp.', 'error');
      if (formBtn) formBtn.textContent = defaultText;
    } finally {
      if (formBtn) formBtn.disabled = false;
    }
  });
});


// Hero carousel — index
const carousels = document.querySelectorAll('[data-carousel]');
carousels.forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dots button'));
  if (!slides.length || !dots.length) return;
  let current = 0;
  let timer = null;

  const showSlide = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  };

  const start = () => {
    stop();
    timer = window.setInterval(() => showSlide(current + 1), 4800);
  };
  const stop = () => {
    if (timer) window.clearInterval(timer);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      start();
    });
  });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  showSlide(0);
  start();
});


// Hero background carousel — index, rotación automática cada 4 segundos
const heroBgCarousels = document.querySelectorAll('[data-hero-bg-carousel]');
heroBgCarousels.forEach(carousel => {
  const slides = Array.from(carousel.querySelectorAll('.hero-bg-slide'));
  if (slides.length < 2) return;

  let current = 0;

  const showSlide = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
  };

  showSlide(0);
  window.setInterval(() => showSlide(current + 1), 4000);
});

// Carrusel de servicios — home
const serviceCarousels = document.querySelectorAll('[data-service-carousel]');
serviceCarousels.forEach(carousel => {
  const track = carousel.querySelector('.home-services-track');
  const slides = Array.from(carousel.querySelectorAll('.home-service-slide'));
  const prev = carousel.querySelector('.service-carousel-prev');
  const next = carousel.querySelector('.service-carousel-next');
  const dotsWrap = carousel.parentElement.querySelector('[data-service-carousel-dots]');
  if (!track || slides.length === 0) return;

  let current = 0;
  const getPerView = () => {
    if (window.matchMedia('(max-width: 600px)').matches) return 1;
    if (window.matchMedia('(max-width: 960px)').matches) return 2;
    return 3;
  };
  let perView = getPerView();

  const getMax = () => Math.max(0, slides.length - perView);
  const buildDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i <= getMax(); i += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir al servicio ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  };

  const updateDots = () => {
    if (!dotsWrap) return;
    Array.from(dotsWrap.children).forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  };

  const goTo = index => {
    current = Math.min(Math.max(index, 0), getMax());
    const slide = slides[0];
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const distance = slide.getBoundingClientRect().width + gap;
    track.style.transform = `translateX(${-current * distance}px)`;
    updateDots();
  };

  const refresh = () => {
    perView = getPerView();
    buildDots();
    goTo(Math.min(current, getMax()));
  };

  prev?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));
  window.addEventListener('resize', refresh, { passive: true });

  buildDots();
  goTo(0);
  window.setInterval(() => goTo(current >= getMax() ? 0 : current + 1), 4500);
});

// Fade-in controlado para tarjetas al hacer scroll
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const selectors = [
    '.card',
    '.team-card',
    '.service-photo-card',
    '.home-service-slide',
    '.home-quick-card',
    '.home-location-card',
    '.location-card',
    '.form-card'
  ];

  const cards = Array.from(document.querySelectorAll(selectors.join(',')));
  if (!cards.length) return;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('is-visible'));
    return;
  }

  cards.forEach((card, index) => {
    card.classList.add('reveal-card');
    card.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  });

  cards.forEach(card => observer.observe(card));
})();


// Modal de foto ampliada — equipo
(() => {
  const modal = document.querySelector('[data-photo-modal]');
  const modalImg = modal ? modal.querySelector('[data-photo-modal-img]') : null;
  const modalTitle = modal ? modal.querySelector('[data-photo-modal-title]') : null;
  const modalRole = modal ? modal.querySelector('[data-photo-modal-role]') : null;
  const triggers = Array.from(document.querySelectorAll('[data-photo-modal-src]'));
  if (!modal || !modalImg || !triggers.length) return;

  let lastTrigger = null;
  const triggerThumbs = new Map(
    triggers.map(trigger => {
      const img = trigger.querySelector('img');
      return [trigger, img ? img.getAttribute('src') : ''];
    })
  );

  const restoreThumbs = () => {
    triggerThumbs.forEach((src, trigger) => {
      if (!src) return;
      const img = trigger.querySelector('img');
      if (img && img.getAttribute('src') !== src) {
        img.setAttribute('src', src);
      }
    });
  };

  const openModal = trigger => {
    lastTrigger = trigger;
    modalImg.src = trigger.getAttribute('data-photo-modal-src') || '';
    modalImg.alt = trigger.getAttribute('data-photo-modal-alt') || '';
    if (modalTitle) modalTitle.textContent = trigger.getAttribute('data-photo-modal-title') || '';
    if (modalRole) modalRole.textContent = trigger.getAttribute('data-photo-modal-role') || '';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('photo-modal-open');
    const closeBtn = modal.querySelector('.photo-modal-close');
    closeBtn?.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('photo-modal-open');
    // No limpiamos el src del modal al cerrar: en algunos navegadores puede
    // provocar un repaint agresivo y dejar en blanco la miniatura recién usada.
    // Además restauramos explícitamente las miniaturas por seguridad.
    modalImg.alt = '';
    if (modalTitle) modalTitle.textContent = '';
    if (modalRole) modalRole.textContent = '';
    restoreThumbs();
    lastTrigger?.focus();
  };

  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      openModal(trigger);
    });
  });

  modal.querySelectorAll('[data-photo-modal-close]').forEach(closeControl => {
    closeControl.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
})();

// Map lazy load
function loadMap(el) {
  var wrapper = el.closest('.map-lazy-wrapper');
  var src = wrapper.dataset.mapSrc;
  var iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.width = '100%';
  iframe.height = '360';
  iframe.style.border = '0';
  iframe.allowFullscreen = true;
  iframe.loading = 'lazy';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  iframe.title = 'Mapa MB Odontología San Bernardo';
  wrapper.innerHTML = '';
  wrapper.appendChild(iframe);
}

// Dental Soft iframe fallback
(function () {
  var iframe = document.getElementById('dentalsoft-iframe');
  if (!iframe) return;

  var TIMEOUT = 8000; // ms — si en 8s no cargó, muestra fallback
  var fallback = document.getElementById('dentalsoft-fallback');
  var wrapper = document.getElementById('dentalsoft-embed-wrapper');

  function showFallback() {
    iframe.style.display = 'none';
    iframe.height = '0';
    if (fallback) fallback.style.display = 'block';
  }

  // Timer: si el iframe no dispara 'load' en tiempo, asumimos fallo
  var timer = setTimeout(showFallback, TIMEOUT);

  iframe.addEventListener('load', function () {
    clearTimeout(timer);
    // Intenta detectar si el contenido está vacío (error silencioso)
    try {
      var doc = iframe.contentDocument || iframe.contentWindow.document;
      if (!doc || doc.body.innerHTML.trim() === '') showFallback();
    } catch (e) {
      // Cross-origin block — el iframe cargó pero no podemos leerlo
      // Asumimos que está bien (es el caso normal de Dental Soft)
      clearTimeout(timer);
    }
  });

  iframe.addEventListener('error', function () {
    clearTimeout(timer);
    showFallback();
  });
})();
