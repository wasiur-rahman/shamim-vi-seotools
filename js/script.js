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

// Wasiur Rahman

let home_section = document.querySelector('.home_section');
home_section.addEventListener('mouseover',function(event){
    let home_right_image = document.querySelector('.home_section .right img');
    var imgx = (event.clientX - home_right_image.offsetLeft - 300) / 40;
    var imgy = (event.clientY - home_right_image.offsetTop - 200) / 40;
    home_right_image.style.transform = "translate(" + imgx + "px," + imgy + "px)";
    home_right_image.style.transition = ".5s ease";
});
  

// add to cart function api

let shoppingCart = (function() {
  let cart = [];

  function Item(name, price, count, image) {
    this.name = name;
    this.price = price;
    this.count = count;
    this.image = image;
  }

  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart')) || [];
  }

  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  let obj = {};

  obj.addItemToCart = function(name, price, count, image) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    let item = new Item(name, price, count, image);
    cart.push(item);
    saveCart();
  }

  obj.setCountForItem = function(name, count) {
    for (let i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };

  obj.removeItemFromCart = function(name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  }

  obj.removeItemFromCartAll = function(name) {
    for (let item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  obj.clearCart = function() {
    cart = [];
    saveCart();
  }

  obj.totalCount = function() {
    let totalCount = 0;
    for (let item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  obj.totalCart = function() {
    let totalCart = 0;
    for (let item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  obj.listCart = function() {
    let cartCopy = [];
    for (let i in cart) {
      let item = cart[i];
      let itemCopy = {};
      for (let p in item) {
        itemCopy[p] = item[p];
      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  return obj;
})();

$('.add-to-cart').click(function(event) {
  event.preventDefault();
  let name = $(this).data('name');
  let price = Number($(this).data('price'));
  let image = $(this).closest('.card').find('.card-img-top').attr('src');
  shoppingCart.addItemToCart(name, price, 1, image);
  displayCart();
});

$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});

function displayCart() {
  let cartArray = shoppingCart.listCart();
  let output = "";
  output+="<thead><tr><th>Image</th><th>Name</th><th>Price</th><th>Quantity</th><th>Action</th><th>Total</th></tr></thead>";
  for (let i in cartArray) {
    output += "<tr>" +
      "<td><img src='" + cartArray[i].image + "' class='cart-item-image'></td>" +
      "<td>" + cartArray[i].name + "</td>" +
      "<td>" + cartArray[i].price + "</td>" +
      "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>" +
      "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>" +
      "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>" +
      "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + "><i class='fas fa-trash-can fa-fw'></i></button></td>" +
      " = " +
      "<td>" + cartArray[i].total + "</td>" +
      "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

$('.show-cart').on("click", ".delete-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
});

$('.show-cart').on("click", ".minus-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
});

$('.show-cart').on("click", ".plus-item", function(event) {
  let name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
});

$('.show-cart').on("change", ".item-count", function(event) {
  let name = $(this).data('name');
  let count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

  