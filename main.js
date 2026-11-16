import { PROJECTS, SKILLS } from './content.js'; // all editable content lives there

const el = (tag, text, cls) => {
  const node = document.createElement(tag);
  if (text) node.textContent = text;
  if (cls) node.className = cls;
  return node;
};
const tagList = (items) => {
  const ul = el('ul', '', 'tags');
  ul.append(...items.map((t) => el('li', t)));
  return ul;
};

document.getElementById('skill-list').append(...Object.entries(SKILLS).map(([group, items]) => {
  const box = el('div');
  box.append(el('h3', group), tagList(items));
  return box;
}));

document.getElementById('project-list').append(...PROJECTS.map((p) => {
  const card = el('a', '', 'project');
  card.href = p.url;
  card.target = '_blank';
  card.rel = 'noopener';
  card.append(el('h3', p.name), el('p', p.text), tagList(p.tags));
  return card;
}));

// Theme toggle. The starting theme is set by the inline script in index.html (saved choice, else system setting).
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const showTheme = () => {
  const dark = root.dataset.theme === 'dark';
  toggle.textContent = dark ? 'Light' : 'Dark'; // the label names the mode you switch to
  toggle.setAttribute('aria-pressed', dark);
};
toggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch { /* private mode: choice just won't persist */ }
  showTheme();
});
showTheme();

// Hero depth: pointer position goes into --mx/--my; the name shifts with it, the portrait stays still (see style.css).
if (matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)').matches) {
  const hero = document.querySelector('.hero');
  addEventListener('pointermove', (e) => {
    hero.style.setProperty('--mx', (e.clientX / innerWidth - 0.5).toFixed(3));
    hero.style.setProperty('--my', (e.clientY / innerHeight - 0.5).toFixed(3));
  });
}
