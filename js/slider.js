const slider = $('.products').bxSlider( {
    pager: false,
    controls: false,
});

$('.left-arrow__link').click(e => {
    e.preventDefault();

    slider.goToPrevSlide();
});


$('.right-arrow__link').click(e => {
    e.preventDefault();

    slider.goToNextSlide();

});