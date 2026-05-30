/* ============================================================
   Arithmex — Shared JavaScript
   Navigation, theme toggle, localStorage utils, copy buttons
   ============================================================ */

'use strict';

// ── Theme ──────────────────────────────────────────────────
const THEME_KEY = 'arithmex-theme';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = theme === 'light' ? '🌙' : '☀️';
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  applyTheme(saved || preferred);
}


// ── Mobile Nav ─────────────────────────────────────────────
function initNav() {
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navLinks');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}


// ── Active Nav Link ─────────────────────────────────────────
function setActiveNav() {
  const path = location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.endsWith(href)) a.classList.add('active');
  });
}


// ── Copy to Clipboard ──────────────────────────────────────
function copyText(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓ Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 1800);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}


// ── LocalStorage Helpers ───────────────────────────────────
const Storage = {
  get(key, fallback = null) {
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : fallback;
    } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
  push(key, item, limit = 20) {
    const arr = this.get(key, []);
    arr.unshift(item);
    if (arr.length > limit) arr.length = limit;
    this.set(key, arr);
  }
};


// ── Number Formatting ─────────────────────────────────────
function fmt(num, decimals = 2) {
  if (isNaN(num) || !isFinite(num)) return '—';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals
  }).format(num);
}

function fmtCurrency(num, currency = 'USD') {
  if (isNaN(num) || !isFinite(num)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(num);
}


// ── Tabs ───────────────────────────────────────────────────
function initTabs(container) {
  const buttons = container.querySelectorAll('.tab-btn');
  const panes   = container.querySelectorAll('.tab-pane');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      buttons.forEach(b => b.classList.toggle('active', b === btn));
      panes.forEach(p => p.classList.toggle('active', p.id === target));
    });
  });
}


// ── Toast notifications ─────────────────────────────────────
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position:fixed;bottom:24px;right:24px;z-index:9999;
    padding:12px 20px;border-radius:10px;font-size:.875rem;font-weight:500;
    background:var(--clr-surface);border:1px solid var(--clr-border);
    color:var(--clr-text);box-shadow:var(--shadow-lg);
    animation:fadeIn .3s ease;pointer-events:none;max-width:320px;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}


// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  setActiveNav();

  // Theme toggle button
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Global copy buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.copy);
      if (target) copyText(target.textContent, btn);
    });
  });

  // All tabs
  document.querySelectorAll('[data-tabs]').forEach(initTabs);
});
