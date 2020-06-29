const burger = document.querySelector(".hamburger");
const menu = document.querySelector(".side-menu__list");
const close = document.querySelector(".close-cross");

burger.addEventListener('click', function () {
    menu.classList.add('side-menu--active');
  console.log('нажали на бургер');
});

menu.addEventListener('click', function (e) {
  if (!e.target.classList.contains('side-menu__link') || e.target.classList.contains('close')) {
    menu.classList.remove('side-menu--active');
    console.log('нажали на крестик');
  }
  if (e.target.classList.contains('side-menu__link')) {
    console.log('меняем секцию');
    menu.classList.remove('side-menu--active');
  }
  
  
});