document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile menu
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }));
  }

  // Estimate form (Formspree)
  const form = document.getElementById('estimateForm');
  const msg = document.getElementById('formMessage');
  if (form && msg) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = '';
      msg.className = 'form-message';
      const data = new FormData(form);
      const missing = ['name', 'phone', 'project_details'].filter((k) => !String(data.get(k) || '').trim());
      if (missing.length) {
        msg.textContent = 'Please add your name, phone number and a few words about the project.';
        msg.classList.add('error');
        const first = form.querySelector(`[name="${missing[0]}"]`);
        if (first) first.focus();
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then((res) => {
          if (!res.ok) throw new Error('Request failed');
          msg.textContent = 'Thank you! We received your request and will call you soon.';
          msg.classList.add('success');
          form.reset();
        })
        .catch(() => {
          msg.textContent = 'Sorry, that did not go through. Please call us at (240) 462-1150.';
          msg.classList.add('error');
        })
        .finally(() => {
          button.disabled = false;
          button.textContent = 'Send My Request';
        });
    });
  }

  // Gallery filters
  const filterButtons = document.querySelectorAll('.filters button');
  const figures = [...document.querySelectorAll('.gallery figure')];
  const applyFilter = (cat) => {
    filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
    figures.forEach((f) => { f.hidden = cat !== 'all' && f.dataset.cat !== cat; });
  };
  filterButtons.forEach((b) => b.addEventListener('click', () => {
    applyFilter(b.dataset.filter);
    history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : '#' + b.dataset.filter);
  }));
  const fromHash = () => {
    const hash = location.hash.slice(1);
    applyFilter([...filterButtons].some((b) => b.dataset.filter === hash) ? hash : 'all');
  };
  if (filterButtons.length) {
    fromHash();
    window.addEventListener('hashchange', fromHash);
  }

  // Lightbox with previous / next
  const box = document.getElementById('lightbox');
  if (box) {
    const img = box.querySelector('img');
    const cap = box.querySelector('figcaption');
    let list = [];
    let index = 0;
    let lastFocus = null;
    const show = (i) => {
      index = (i + list.length) % list.length;
      const fig = list[index];
      const pic = fig.querySelector('img');
      img.src = pic.src;
      img.alt = pic.alt;
      cap.textContent = fig.querySelector('figcaption')?.textContent || '';
    };
    const open = (fig) => {
      list = figures.filter((f) => !f.hidden);
      lastFocus = document.activeElement;
      show(list.indexOf(fig));
      box.classList.add('open');
      document.body.style.overflow = 'hidden';
      box.querySelector('.lb-close').focus();
    };
    const close = () => {
      box.classList.remove('open');
      document.body.style.overflow = '';
      img.src = '';
      if (lastFocus) lastFocus.focus();
    };
    figures.forEach((fig) => fig.querySelector('button').addEventListener('click', () => open(fig)));
    box.querySelector('.lb-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
    box.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(index - 1);
      if (e.key === 'ArrowRight') show(index + 1);
    });
  }
});
