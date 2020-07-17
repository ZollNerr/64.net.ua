const burger = document.querySelector(".hamburger");
const menu = document.querySelector(".side-menu");
const close = document.querySelector(".close-cross");

burger.addEventListener('click', function () {
  menu.classList.add('side-menu--active');
  console.log('нажали на бургер');
});

menu.addEventListener('click', function (e) {
   
    if (e.target.classList.contains('close')) {
        // console.log('нажали на крестик');
        console.log(e.target)
        menu.classList.remove('side-menu--active');
      }

  if (!e.target.classList.contains('side-menu__link')) {
    menu.classList.remove('side-menu--active');
    console.log('нажали на пустое место');
  }


  if (e.target.classList.contains('side-menu__link')) {
    console.log('меняем секцию');
    menu.classList.remove('side-menu--active');
  }
  
  
});