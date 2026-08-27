
document.getElementById('year').textContent = new Date().getFullYear();

const links = [...document.querySelectorAll('nav a')];
const targets = links
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(a => a.removeAttribute('aria-current'));
      const current = links.find(a => a.getAttribute('href') === '#' + entry.target.id);
      if (current) current.setAttribute('aria-current', 'page');
    });
  }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
  targets.forEach(t => observer.observe(t));
}
