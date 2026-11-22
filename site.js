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
    });
    nav.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Estimate form (Formspree)
  const form = document.getElementById('estimateForm');
  const msg = document.getElementById('formMessage');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      msg.textContent = '';
      msg.className = 'form-message';
      const data = new FormData(form);
      const missing = ['name', 'phone', 'project_details'].filter((k) => !String(data.get(k) || '').trim());
      if (missing.length) {
        msg.textContent = 'Please add your name, phone number and a few project details.';
        msg.classList.add('error');
        return;
      }
      const button = form.querySelector('button[type="submit"]');
      button.disabled = true;
      button.textContent = 'Sending…';
      fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then((res) => {
          if (!res.ok) throw new Error('Request failed');
          msg.textContent = 'Thank you. We received your request and will call you soon.';
          msg.classList.add('success');
          form.reset();
        })
        .catch(() => {
          msg.textContent = 'Sorry, that did not go through. Please call (240) 462-1150.';
          msg.classList.add('error');
        })
        .finally(() => {
          button.disabled = false;
          button.textContent = 'Send Request';
        });
    });
  }

  // Gallery filters
  const filterButtons = document.querySelectorAll('.filters button');
  const items = document.querySelectorAll('.gallery figure');
  const applyFilter = (cat) => {
    filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === cat)));
    items.forEach((fig) => { fig.hidden = cat !== 'all' && fig.dataset.cat !== cat; });
  };
  filterButtons.forEach((b) => b.addEventListener('click', () => {
    applyFilter(b.dataset.filter);
    history.replaceState(null, '', b.dataset.filter === 'all' ? location.pathname : '#' + b.dataset.filter);
  }));
  if (filterButtons.length) {
    const hash = location.hash.slice(1);
    const known = [...filterButtons].some((b) => b.dataset.filter === hash);
    applyFilter(known ? hash : 'all');
  }

  // Lightbox
  const box = document.getElementById('lightbox');
  if (box) {
    const img = box.querySelector('img');
    const close = () => { box.classList.remove('open'); img.src = ''; };
    document.querySelectorAll('.gallery button').forEach((btn) =>
      btn.addEventListener('click', () => {
        const pic = btn.querySelector('img');
        img.src = pic.src;
        img.alt = pic.alt;
        box.classList.add('open');
        box.querySelector('.lightbox-close').focus();
      })
    );
    box.addEventListener('click', (e) => { if (e.target === box || e.target.classList.contains('lightbox-close')) close(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }
});
