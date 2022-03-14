const burger = document.querySelector('.button-burger');

function toggleMenu() {
  burger.classList.toggle('open');
}
burger.addEventListener('click', toggleMenu);