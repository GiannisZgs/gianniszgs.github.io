// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu after clicking a link (mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ---------- Theme toggle (light = Daylight Lab, dark = Arctic Cyan) ----------
let traceRGB = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  traceRGB = getComputedStyle(document.documentElement).getPropertyValue('--accent-rgb').trim();
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });
}

// ---------- Oscilloscope grid trace, reused on every hero/section/footer canvas ----------
function initTrace(root, canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, dpr, trail = [];

  function resize() {
    const r = root.getBoundingClientRect();
    dpr = window.devicePixelRatio || 1;
    w = r.width; h = r.height;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function frame(t) {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = `rgba(${traceRGB},0.14)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 5) {
      const y = h * 0.8 + Math.sin((x + t * 0.03) * 0.015) * 10;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    trail.forEach(p => p.age++);
    trail = trail.filter(p => p.age < 45);
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    for (let i = 1; i < trail.length; i++) {
      const a = trail[i - 1], b = trail[i];
      const alpha = Math.max(0, 1 - b.age / 45);
      ctx.strokeStyle = `rgba(${traceRGB},${alpha})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = `rgba(${traceRGB},0.7)`;
      ctx.shadowBlur = 6;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(frame);
  }

  root.addEventListener('mousemove', e => {
    const r = root.getBoundingClientRect();
    trail.push({ x: e.clientX - r.left, y: e.clientY - r.top, age: 0 });
    if (trail.length > 80) trail.shift();
  });
  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
}

const heroEl = document.querySelector('.hero');
const heroCanvas = document.getElementById('heroCanvas');
if (heroEl && heroCanvas) {
  initTrace(heroEl, heroCanvas);
}

document.querySelectorAll('.section-canvas, .footer-canvas').forEach(canvas => {
  initTrace(canvas.parentElement, canvas);
});

// ---------- Research card cursor spotlight ----------
document.querySelectorAll('.research-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});
