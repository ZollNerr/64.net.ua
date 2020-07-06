const findBlockbyAlias = alias => {
    return $(".review__item").filter((ndx, item) => {
        return $(item).attr("data-linked-with") == alias
    });
}

$(".interactive-avatar-link").click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-open");
    const itemToShow = findBlockbyAlias(target);
    const curItem = $this.closest(".review__switcher-item");

    itemToShow.addClass("active").siblings().removeClass("active");
    curItem.addClass("active").siblings().removeClass("active");
});