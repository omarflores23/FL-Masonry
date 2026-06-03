document.addEventListener('DOMContentLoaded', function () {
  const year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('open');
      this.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (navToggle) {
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  const heroSlides = document.querySelectorAll('.hero-slide');
  if (heroSlides.length > 1) {
    let activeSlide = 0;
    setInterval(() => {
      heroSlides[activeSlide].classList.remove('active');
      activeSlide = (activeSlide + 1) % heroSlides.length;
      heroSlides[activeSlide].classList.add('active');
    }, 8000);
  }

  const processCards = document.querySelectorAll('.process-card');
  const previewImage = document.querySelector('.process-preview img');
  const previewTitle = document.querySelector('.process-preview-copy h3');
  const previewText = document.querySelector('.process-preview-copy p');

  const processData = {
    consultation: {
      src: 'images/process-consultation.jpg',
      alt: 'Flores Landscaping consultation with homeowner on property',
      title: 'Consultation',
      text: 'A clear conversation before the work begins.'
    },
    estimate: {
      src: 'images/process-estimate.jpg',
      alt: 'Flores Landscaping preparing a written masonry estimate',
      title: 'Estimate',
      text: 'Simple pricing and a written plan.'
    },
    installation: {
      src: 'images/process-installation.jpg',
      alt: 'Worker installing stone masonry during project construction',
      title: 'Installation',
      text: 'Careful stonework built with detail.'
    },
    finish: {
      src: 'images/process-finish.jpg',
      alt: 'Finished stone water feature and masonry project',
      title: 'Finish',
      text: 'A polished project ready to enjoy.'
    }
  };

  function setActiveStep(step) {
    processCards.forEach((card) => {
      card.classList.toggle('active', card.dataset.process === step);
    });
    const item = processData[step] || processData.consultation;
    if (previewImage) {
      previewImage.src = item.src;
      previewImage.alt = item.alt;
    }
    if (previewTitle) previewTitle.textContent = item.title;
    if (previewText) previewText.textContent = item.text;
  }

  processCards.forEach((card) => {
    const step = card.dataset.process;
    if (!step) return;

    const activate = () => setActiveStep(step);
    card.addEventListener('mouseenter', activate);
    card.addEventListener('focus', activate);
    card.addEventListener('click', activate);
  });

  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('contactFormMessage');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (formMessage) {
        formMessage.textContent = '';
        formMessage.classList.remove('error', 'success');
      }

      const formData = new FormData(contactForm);
      const name = (formData.get('name') || '').toString().trim();
      const phone = (formData.get('phone') || '').toString().trim();
      const email = (formData.get('email') || '').toString().trim();
      const details = (formData.get('project_details') || '').toString().trim();

      if (!name || !phone || !email || !details) {
        if (formMessage) {
          formMessage.textContent = 'Please complete all required fields.';
          formMessage.classList.add('error');
        } else {
          alert('Please complete all required fields.');
        }
        return;
      }

      fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then((response) => {
        if (response.ok) {
          if (formMessage) {
            formMessage.textContent = 'Thank you. Your estimate request has been sent. We will follow up soon.';
            formMessage.classList.add('success');
          } else {
            alert('Thank you. Your estimate request has been sent. We will follow up soon.');
          }
          contactForm.reset();
        } else {
          return response.json().then((data) => {
            throw new Error(data?.error || 'Submission failed');
          });
        }
      }).catch((err) => {
        if (formMessage) {
          formMessage.textContent = 'Sorry — there was a problem sending your request. Please try again later.';
          formMessage.classList.add('error');
        } else {
          alert('Sorry — there was a problem sending your request. Please try again later.');
        }
        console.error(err);
      });
    });
  }

  /* --- Gallery interactions & lightbox --- */
  const galleryCategoryCards = document.querySelectorAll('.gallery-category-card');
  galleryCategoryCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // cards are anchors to sections
      const href = card.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // focus first image in section for keyboard users
        const img = target.querySelector('img');
        if (img) img.focus();
      }
    });
  });

  /* Fade-in on scroll for gallery cards (accessible, subtle) */
  const galleryCards = document.querySelectorAll('.gallery-image-card');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    galleryCards.forEach((c) => obs.observe(c));
  } else {
    // fallback
    galleryCards.forEach((c) => c.classList.add('in-view'));
  }

  // Build a simple lightbox element
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-hidden', 'true');
  lightbox.innerHTML = `
    <div class="lightbox-controls">
      <button class="lightbox-btn prev" aria-label="Previous image">◀</button>
      <button class="lightbox-btn next" aria-label="Next image">▶</button>
      <button class="lightbox-btn close" aria-label="Close">✕</button>
    </div>
    <img alt="Expanded gallery image" />
  `;
  document.body.appendChild(lightbox);

  const lbImage = lightbox.querySelector('img');
  const btnPrev = lightbox.querySelector('.lightbox-btn.prev');
  const btnNext = lightbox.querySelector('.lightbox-btn.next');
  const btnClose = lightbox.querySelector('.lightbox-btn.close');

  let currentImages = [];
  let currentIndex = 0;

  function openLightbox(imagesArray, index) {
    currentImages = imagesArray;
    currentIndex = index;
    const item = currentImages[currentIndex];
    lbImage.src = item.src;
    lbImage.alt = item.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    // trap focus on close button
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lbImage.src = '';
    currentImages = [];
  }

  function showNext() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex + 1) % currentImages.length;
    const item = currentImages[currentIndex];
    lbImage.src = item.src;
    lbImage.alt = item.alt || '';
  }

  function showPrev() {
    if (!currentImages.length) return;
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    const item = currentImages[currentIndex];
    lbImage.src = item.src;
    lbImage.alt = item.alt || '';
  }

  // Click on gallery images to open lightbox
  const galleryImages = document.querySelectorAll('.gallery-image-card img');
  galleryImages.forEach((img) => {
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', (e) => {
      const section = img.closest('.gallery-section');
      const imgs = Array.from(section.querySelectorAll('.gallery-image-card img'));
      const imagesArray = imgs.map((i) => ({ src: i.src, alt: i.alt }));
      const index = imgs.indexOf(img);
      openLightbox(imagesArray, index);
    });
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        img.click();
      }
    });
  });

  btnClose.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', showNext);
  btnPrev.addEventListener('click', showPrev);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
});
