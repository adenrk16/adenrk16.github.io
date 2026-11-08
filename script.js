"use strict";

document.documentElement.classList.add("js");

/* Portfolio profile: edit the contact information below when it changes. */
const PROFILE = {
  name: "Aden Kallery",
  email: "aden.kallery@gmail.com",
  schoolEmail: "ark43770@uga.edu",
  github: "", // Add your personal GitHub URL here if you'd like to display it later.
  linkedin: "https://www.linkedin.com/in/akallery"
};

const projectDetails = {
  "router": {
    "category": "OFFENSIVE SECURITY / FIRMWARE",
    "title": "Router Vulnerability Analysis",
    "description": "Found and exploited vulnerabilities in an Asus router to obtain root access, bypass the stock bootloader, and replace its legacy firmware.",
    "details": "Personal project · July 2026. Replaced stock firmware with an open-source alternative to improve administrative control and security.",
    "tags": [
      "Vulnerability analysis",
      "Firmware",
      "Linux"
    ]
  },
  "ncae": {
    "category": "APPLICATIONS / BLUE TEAM",
    "title": "NCAE Cyber Games",
    "description": "Deployed and administered a Flask/Nginx application backed by PostgreSQL while responding to attacks from around 30 red-team participants.",
    "details": "Website and database administrator · February 2026. Earned Blue Team MVP; the team placed 5th in the Southeast.",
    "tags": [
      "Flask",
      "Nginx",
      "PostgreSQL"
    ]
  },
  "faust": {
    "category": "ATTACK-DEFENSE / CTF",
    "title": "FAUST CTF",
    "description": "Competed in live attack-defense, balancing exploitation, service protection, and team coordination; finished among the top 30 of 500 teams.",
    "details": "Attack-defense competitor · September 2026. A top-6% team placement among 500 teams.",
    "tags": [
      "Attack-defense",
      "Teamwork",
      "Linux"
    ]
  },
  "vandy": {
    "category": "LOCAL AI / SOFTWARE",
    "title": "VandyHacks AI Chatbot",
    "description": "Built a locally hosted AI chatbot to provide disaster-recovery guidance without relying on external API services.",
    "details": "AI engineer · March 2026. The project won Best Financial Project Overall at VandyHacks.",
    "tags": [
      "Local AI",
      "Software",
      "Disaster recovery"
    ]
  },
  "server": {
    "category": "LINUX / INFRASTRUCTURE",
    "title": "Linux Server Build & Hardening",
    "description": "Repurposed legacy hardware into a multiuser Linux server with SSH and Samba, adding TraceBit honey credentials to detect unauthorized access.",
    "details": "Personal project · January 2026. Focused on configuration, hardening, and useful security alerting for a self-managed server.",
    "tags": [
      "Linux",
      "SSH",
      "Samba",
      "TraceBit"
    ]
  },
  "raymond": {
    "category": "INCIDENT RESPONSE / CTF",
    "title": "Raymond James CTF",
    "description": "Earned a top-10 finish across Jeopardy challenges, attack-defense, and incident response, including evidence analysis and a formal report.",
    "details": "Invite-only competitor · October 2026. Presented findings and recommendations following the competition.",
    "tags": [
      "Forensics",
      "Incident response",
      "Reporting"
    ]
  },
  "viceroy": {
    "category": "LEADERSHIP / SECURITY",
    "title": "Viceroy Gilded Guardian",
    "description": "Captained a team to 3rd place in a simulated missile-defense scenario, using Sliver C2 to analyze services and neutralize the modeled threat.",
    "details": "Team captain · April 2026. Conducted operations in the controlled competition simulation.",
    "tags": [
      "Team leadership",
      "Sliver C2",
      "Service analysis"
    ]
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
  $$('[data-copy-email]').forEach(button => button.addEventListener('click', async () => {
    const email = button.dataset.copyEmail;
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(email);
      else {
        const temporary = document.createElement('textarea');
        temporary.value = email; temporary.style.position = 'fixed'; temporary.style.opacity = '0';
        document.body.append(temporary); temporary.select();
        const copied = document.execCommand('copy'); temporary.remove();
        if (!copied) throw Error('copy failed');
      }
      showToast('Email copied to clipboard');
    } catch {
      showToast(`Email: ${email}`);
    }
  }));
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
