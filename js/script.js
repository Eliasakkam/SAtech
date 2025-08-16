// Robust hamburger menu
(function(){
  const body = document.body;
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('navLinks');
  const backdrop = document.getElementById('backdrop');

  function openMenu(){
    body.classList.add('menu-open');
    if (btn) btn.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    body.classList.remove('menu-open');
    if (btn) btn.setAttribute('aria-expanded','false');
  }
  function toggle(){
    if (body.classList.contains('menu-open')) closeMenu(); else openMenu();
  }

  if (btn) btn.addEventListener('click', toggle);
  if (backdrop) backdrop.addEventListener('click', closeMenu);
  if (nav) nav.addEventListener('click', e => {
    if (e.target.tagName === 'A') closeMenu();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  // Ensure desktop always visible
  const mq = window.matchMedia('(max-width: 900px)');
  function handleMQ(){
    if (!mq.matches){ // desktop
      closeMenu();
    }
  }
  mq.addEventListener ? mq.addEventListener('change', handleMQ) : mq.addListener(handleMQ);
  handleMQ();

  // Register SW
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(console.error);
    });
  }
})();