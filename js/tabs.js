$(".interactive-avatar-link").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const curItem = $this.closest(".review__switcher-item");


    curItem.addClass("active").siblings().removeClass("active");
});