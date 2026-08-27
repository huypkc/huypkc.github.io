// Year, and a reveal that is strictly opt-in: the class goes on <html> only
// once this file runs, so with JavaScript off or blocked every section is
// already visible rather than stuck at opacity 0.
document.getElementById('year').textContent = new Date().getFullYear();

const rise = document.querySelectorAll('.rise');
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (rise.length && 'IntersectionObserver' in window && !still) {
  document.documentElement.classList.add('js-anim');
  const seen = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('shown');
      seen.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -12% 0px' });
  rise.forEach((el) => seen.observe(el));
}
