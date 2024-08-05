export function initNavbar() {
  const navBtn = document.querySelector('.menu-button');
  const navMenu = document.querySelector('.nav-wrap');
  const body = document.querySelector('body');

  navBtn.addEventListener('click', () => {
    navBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    body.classList.toggle('no-scroll');  
  });

  navMenu.addEventListener('click', (event) => {
    if (event.target.className != 'menu-item') return;
    navBtn.classList.remove('active');
    navMenu.classList.remove('active');
    body.classList.remove('no-scroll');
  });
}
