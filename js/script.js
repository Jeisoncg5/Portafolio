// ── NAV SCROLL EFFECT ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ── MOBILE NAV ──
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('nav-links').classList.toggle('open');
});
document.querySelectorAll('#nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('nav-links').classList.remove('open');
  });
});

// ── TYPED TEXT EFFECT ──
const roles = [
  'Desarrollador Junior',
  'Frontend Dev',
  'Backend Dev',
  'Problem Solver',
  'Code Crafter'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    charIndex--;
    typedEl.textContent = current.substring(0, charIndex);
  } else {
    charIndex++;
    typedEl.textContent = current.substring(0, charIndex);
  }
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeEffect, delay);
}
typeEffect();

// ── INTERSECTION OBSERVER: REVEAL + COUNTERS ──
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const counter = entry.target.querySelector('.counter');
      if (counter && !counter.dataset.done) {
        counter.dataset.done = 'true';
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target);
      }
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('[data-reveal]').forEach(el => counterObserver.observe(el));

// Stagger stat card reveals
const statCards = document.querySelectorAll('.stat-card');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
        const counter = entry.target.querySelector('.counter');
        if (counter && !counter.dataset.done) {
          counter.dataset.done = 'true';
          animateCounter(counter, parseInt(counter.dataset.target));
        }
      }, i * 120);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
statCards.forEach(card => statObserver.observe(card));

// Project cards stagger
const projectCards = document.querySelectorAll('.project-card');
const projObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      const i = Array.from(projectCards).indexOf(entry.target);
      entry.target.style.animationDelay = (i * 0.1) + 's';
      entry.target.classList.add('visible');
      projObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
projectCards.forEach(card => projObserver.observe(card));

function animateCounter(el, target) {
  let current = 0;
  const duration = 1200;
  const steps = 40;
  const increment = target / steps;
  const interval = duration / steps;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, interval);
}

// ── SEND BUTTON ──
document.getElementById('sendBtn')?.addEventListener('click', () => {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
});

// ── CURSOR GLOW EFFECT ──
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(207,207,207,0.04) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
  transform: translate(-50%, -50%);
  transition: left 0.1s, top 0.1s;
`;
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ── SKILL BAR ANIMATION ──
const skillBars = document.querySelectorAll('.skill-cat-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const targetWidth = el.style.width;
      el.style.width = '0%';
      setTimeout(() => { el.style.width = targetWidth; }, 200);
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
skillBars.forEach(bar => barObserver.observe(bar));

// ── ACTIVE NAV HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const highlightNav = () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--accent)'
      : '';
  });
};
window.addEventListener('scroll', highlightNav);
