// ------------------------------
// Optimized Scroll Handling: Sticky Nav + Parallax Hero
// ------------------------------
const nav = document.querySelector("nav.nav-bar");
const heroBg = document.querySelector(".background-image");

let ticking = false;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Sticky nav
  nav.classList.toggle("scrolled", scrollY > 10);

  // Parallax hero background (optimized)
  if(heroBg && !ticking){
    window.requestAnimationFrame(() => {
      heroBg.style.transform = `translateY(${scrollY * 0.15}px)`;
      ticking = false;
    });
    ticking = true;
  }
});

// ------------------------------
// IntersectionObserver: Fade-in Animations
// ------------------------------
const hiddenElements = document.querySelectorAll('.hidden');

const fadeObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 }); 

hiddenElements.forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.15}s`;
  fadeObserver.observe(el);
});

// ------------------------------
// Lazy-load div backgrounds
// ------------------------------
const lazyObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const el = entry.target;
      el.style.backgroundImage = `url(${el.dataset.bg})`;
      el.classList.add('loaded'); // optional fade-in
      observer.unobserve(el);
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.lazy-bg').forEach(el => lazyObserver.observe(el));
