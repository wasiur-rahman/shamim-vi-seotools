(function () {
    const openNavMenu = document.querySelector(".mobile_nav"),
        closeNavMenu = document.querySelector(".close_mobile_nav"),
        navMenu = document.querySelector(".nav_menu"),
        menuOverlay = document.querySelector(".header .menu_overlay");

    openNavMenu.addEventListener("click", toogleNav);
    closeNavMenu.addEventListener("click", toogleNav);
    menuOverlay.addEventListener("click", toogleNav);

    function toogleNav() {
        navMenu.classList.toggle("open");
        menuOverlay.classList.toggle("active");
        document.body.classList.toggle("scroll_hide");
        if (navMenu.querySelector(".menu_item_has_children.active")) {
            collapseSubMenu();
        }
    }

    navMenu.addEventListener("click", function (event) {
        event.preventDefault();
        if (event.target.hasAttribute("data-toggle") && window.innerWidth <= 992) {
            const targetHasMenuItem = event.target.parentElement;
            if (targetHasMenuItem.classList.contains("active")) {
                collapseSubMenu();
            } else {
                if (navMenu.querySelector(".menu_item_has_children.active")) {
                    collapseSubMenu();
                }
                targetHasMenuItem.classList.add("active");
                const subMenu = targetHasMenuItem.querySelector(".sum_menu");
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            }
        }
    });

    function collapseSubMenu() {
        navMenu.querySelector(".menu_item_has_children.active .sum_menu").removeAttribute("style");
        navMenu.querySelector(".menu_item_has_children.active").classList.remove("active");
    }

    function resizeFix() {
        if (navMenu.classList.contains("open")) {
            toogleNav();
        }
        if (navMenu.querySelector(".menu_item_has_children.active")) {
            collapseSubMenu();
        }
    }


    window.addEventListener('resize', function () {
        if (this.innerWidth > 991) {
            resizeFix();
        }
    })
})();