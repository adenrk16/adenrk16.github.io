"use strict";

document.documentElement.classList.add("js");

/*
  EDIT YOUR DETAILS HERE.
  The website has intentionally generic sample content until you personalize it.
  Add your REAL project details in index.html and the projectDetails object below.
*/
const PROFILE = {
  name: "Your Name",
  email: "hello@example.com",
  github: "https://github.com",                 // Replace with your profile URL
  linkedin: "https://www.linkedin.com",          // Replace with your profile URL
};

const projectDetails = {
  network: {
    category: "CYBERSECURITY / NETWORKING",
    title: "Network Traffic Analyzer",
    description: "A sample project concept for examining packet captures and turning traffic data into clear observations.",
    details: "Possible features include protocol breakdowns, traffic summaries, and anomaly highlighting. For your own project, describe the exact problem, your implementation, a screenshot or demo, and what you learned.",
    tags: ["Python", "Wireshark", "TCP/IP", "Data analysis"]
  },
  ctf: {
    category: "CYBERSECURITY / RESEARCH",
    title: "CTF Notes & Writeups",
    description: "A sample collection of structured writeups documenting security exercises and what they teach.",
    details: "Organize each writeup around the challenge, the investigative process, evidence, and lessons learned. Publish only material permitted by event rules, and avoid disclosing real credentials or sensitive information.",
    tags: ["Linux", "Digital forensics", "Research", "Documentation"]
  },
  monitor: {
    category: "SOFTWARE + SECURITY",
    title: "File Integrity Monitor",
    description: "A sample application concept for detecting changes in selected files.",
    details: "Compare cryptographic hashes against a recorded baseline and generate readable change reports. For a real portfolio project, include test cases, known limitations, and your own repository URL.",
    tags: ["Python", "SHA-256", "Automation", "Testing"]
  },
  dashboard: {
    category: "SOFTWARE / FRONTEND",
    title: "Developer Dashboard",
    description: "A sample responsive productivity dashboard concept.",
    details: "Organize tasks and surface progress in a simple, accessible interface. Replace this example with your own app, explain the stack and design choices, and link to the working demo or source.",
    tags: ["HTML", "CSS", "JavaScript", "Accessibility"]
  }
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function setProfileContent() {
  $$('[data-profile-name]').forEach(el => { el.textContent = PROFILE.name; });
  $$('.brand-word').forEach(el => {
    if (el.firstChild?.nodeType === Node.TEXT_NODE) {
      el.firstChild.nodeValue = PROFILE.name.toLowerCase().replace(/[^a-z0-9]+/g, '').slice(0, 20) || 'portfolio';
    }
  });
  $$('[data-github-text]').forEach(el => { el.textContent = PROFILE.github.replace(/^https?:\/\//, '').replace(/\/$/, ''); });
  $$('[data-linkedin-text]').forEach(el => { el.textContent = PROFILE.linkedin.replace(/^https?:\/\//, '').replace(/\/$/, ''); });
  $$('[data-email-link]').forEach(link => { link.href = `mailto:${PROFILE.email}`; });
  $$('[data-email-text]').forEach(el => { el.textContent = PROFILE.email; });
  $$('[data-github]').forEach(link => { link.href = PROFILE.github; });
  $$('[data-linkedin]').forEach(link => { link.href = PROFILE.linkedin; });
  $$('.footer-brand').forEach(el => {
    el.replaceChildren(document.createTextNode(PROFILE.name));
    const dot = document.createElement('span'); dot.textContent = '.'; el.append(dot);
  });
}

function initTheme() {
  const toggle = $('.theme-toggle');
  let saved = null;
  try { saved = localStorage.getItem('portfolio-theme'); } catch { /* Browser restricts storage. */ }
  const initial = saved === 'dark' || saved === 'light' ? saved : 'light';
  const apply = theme => {
    document.documentElement.dataset.theme = theme;
    if (toggle) toggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#f8f9f6' : '#141919';
  };
  apply(initial);
  toggle?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('portfolio-theme', next); } catch { /* Optional persistence. */ }
  });
}

function initMobileMenu() {
  const toggle = $('.menu-toggle');
  const menu = $('#mobile-nav');
  if (!toggle || !menu) return;
  const setOpen = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    const bars = $$('span', toggle);
    if (bars[0]) bars[0].style.transform = open ? 'translateY(4px) rotate(45deg)' : '';
    if (bars[1]) bars[1].style.transform = open ? 'translateY(-4px) rotate(-45deg)' : '';
  };
  toggle.addEventListener('click', () => setOpen(menu.hidden));
  $$('a', menu).forEach(link => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
  });
  window.addEventListener('resize', () => { if (innerWidth > 850 && !menu.hidden) setOpen(false); });
}

function initProjects() {
  const filters = $$('[data-filter]');
  const cards = $$('.project-card');
  filters.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    cards.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
  }));

  const dialog = $('.project-dialog');
  if (!dialog) return;
  $$('[data-project]').forEach(button => button.addEventListener('click', () => {
    const info = projectDetails[button.dataset.project];
    if (!info) return;
    $('#dialog-category').textContent = info.category;
    $('#dialog-title').textContent = info.title;
    $('#dialog-description').textContent = info.description;
    $('#dialog-details').textContent = info.details;
    const tags = $('#dialog-tags');
    tags.replaceChildren(...info.tags.map(label => {
      const tag = document.createElement('span'); tag.textContent = label; return tag;
    }));
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }));
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
}

let toastTimeout;
function showToast(message) {
  const el = $('.toast'); if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => el.classList.remove('show'), 2400);
}

function initContact() {
  $('.copy-email')?.addEventListener('click', async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(PROFILE.email);
      else {
        const temp = document.createElement('textarea');
        temp.value = PROFILE.email; temp.style.position = 'fixed'; temp.style.opacity = '0';
        document.body.append(temp); temp.select();
        const copied = document.execCommand('copy'); temp.remove();
        if (!copied) throw Error('copy failed');
      }
      showToast('Email copied to clipboard');
    } catch {
      showToast(`Email: ${PROFILE.email}`);
    }
  });
}

function initRevealAndScroll() {
  const items = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('visible'));

  const bar = $('#scroll-progress');
  if (bar) {
    let ticking = false;
    const update = () => {
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${limit > 0 ? Math.min(100, Math.max(0, scrollY / limit * 100)) : 0}%`;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }
}

setProfileContent();
initTheme();
initMobileMenu();
initProjects();
initContact();
initRevealAndScroll();
