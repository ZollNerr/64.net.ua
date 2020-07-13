const mesureWidth = item => {
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest(".products-menu");
    const titleBlocks = container.find(".products-menu__title");
    const titleWidth = titleBlocks.width() * titleBlocks.length;

    const textContainer = item.find(".products-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    // console.log(titleWidth)

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
        reqItemWidth = screenWidth - titleWidth;
    }   else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingRight - paddingLeft
    }
};

const closeEveryItemInContainer = container => {
    const items = container.find(".products-menu__item");
    const content = container.find(".products-menu__content");

    items.removeClass("active");

    content.width(0);
}

const openItemAcc = (item) => {
    const hiddenContent = item.find(".products-menu__content");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".products-menu__container");

    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
};

$(".products-menu__title").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".products-menu__item");
    const ItemOpened = item.hasClass("active");
    const container = $this.closest(".products-menu");

    if (ItemOpened) {
        closeEveryItemInContainer(container)
    } else {
        closeEveryItemInContainer(container)
        openItemAcc(item);
    }

    

});

$(".products-menu__close-x").on("click", e => {
    e.preventDefault();

    closeEveryItemInContainer($('.products-menu'));
})