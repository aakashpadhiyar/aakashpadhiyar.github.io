'use strict';

// ===== FOOTER YEAR =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('back-to-top');

function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let found = false;

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (window.scrollY >= top && window.scrollY < bottom && !found) {
      found = true;
      navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active-link');
        }
      });
    }
  });
}

window.addEventListener('scroll', function() {
  // Navbar background
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  // Back to top button
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
  // Active nav highlight
  highlightNavLink();
}, { passive: true });

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-overlay');

function openMenu() {
  mobileMenu && mobileMenu.classList.add('open');
  hamburger && hamburger.classList.add('open');
  mobileOverlay && mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  hamburger && hamburger.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  mobileMenu && mobileMenu.classList.remove('open');
  hamburger && hamburger.classList.remove('open');
  mobileOverlay && mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
  hamburger && hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger) {
  hamburger.addEventListener('click', function() {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
  });
}

if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.mobile-menu a').forEach(function(link) {
  link.addEventListener('click', closeMenu);
});

// ===== TYPING ANIMATION =====
const typedStrings = [
  'Python Django Developer',
  'Backend API Developer',
  'AI & Automation Engineer',
  'Stock Market Tech Builder',
  'Web Scraping Specialist',
  'Freelance Developer'
];

let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed');

function type() {
  if (!typedEl) return;
  const current = typedStrings[stringIndex];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let delay = isDeleting ? 55 : 90;

  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    stringIndex = (stringIndex + 1) % typedStrings.length;
    delay = 350;
  }

  setTimeout(type, delay);
}

if (typedEl) setTimeout(type, 1400);

// ===== PROJECT FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach(function(card) {
      const cats = (card.dataset.category || '').split(' ');
      if (filter === 'all' || cats.includes(filter)) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(function(el) { revealObserver.observe(el); });
} else {
  revealEls.forEach(function(el) { el.classList.add('visible'); });
}

// ===== BACK TO TOP =====
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
