(function (window, $) {
  function getProductById(productId) {
    return window.CrumbleStore.getProducts().find(function (product) {
      return product.id === productId;
    });
  }

  function addToCart(productId) {
    var cart = window.CrumbleStore.getCart();
    var product = getProductById(productId);
    if (!product) { return; }

    var existing = cart.find(function (item) { return item.productId === productId; });
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ productId: product.id, quantity: 1, unitPrice: product.price });
    }

    window.CrumbleStore.setCart(cart);
    window.CrumbleApp.updateCartBadge();
    window.CrumbleUI.toast(product.name + " agregado al carrito");
    renderCartPage();
  }

  function updateQuantity(productId, quantity) {
    var cart = window.CrumbleStore.getCart().map(function (item) {
      if (item.productId === productId) { item.quantity = Math.max(1, Number(quantity)); }
      return item;
    });
    window.CrumbleStore.setCart(cart);
    window.CrumbleApp.updateCartBadge();
    renderCartPage();
  }

  function removeItem(productId) {
    var cart = window.CrumbleStore.getCart().filter(function (item) { return item.productId !== productId; });
    window.CrumbleStore.setCart(cart);
    window.CrumbleApp.updateCartBadge();
    renderCartPage();
  }

  function clearCart() {
    window.CrumbleStore.setCart([]);
    window.CrumbleApp.updateCartBadge();
    renderCartPage();
  }

  function cartDetails() {
    return window.CrumbleStore.getCart().map(function (item) {
      var product = getProductById(item.productId);
      if (!product) { return null; }
      return {
        productId: product.id,
        name: product.name,
        image: product.image,
        unitPrice: Number(item.unitPrice),
        quantity: Number(item.quantity),
        lineTotal: Number(item.unitPrice) * Number(item.quantity)
      };
    }).filter(Boolean);
  }

  function renderCartPage() {
    if (!$("#cartItemsContainer").length) { return; }

    var items = cartDetails();
    var subtotal = items.reduce(function (sum, item) { return sum + item.lineTotal; }, 0);

    if (!items.length) {
      $("#cartItemsContainer").html(window.CrumbleUI.emptyState("Tu carrito esta vacio", "Agrega productos desde el menu para continuar con el checkout.", "menu.html", "Ir al menu"));
    } else {
      $("#cartItemsContainer").html(items.map(function (item) {
        return '' +
          '<div class="cart-line">' +
            '<div class="cart-thumb"><img src="' + window.CrumbleUI.assetPath(item.image) + '" alt="' + item.name + '"></div>' +
            '<div>' +
              '<h3 class="h5 mb-1">' + item.name + '</h3>' +
              '<p class="text-muted mb-2">Precio unitario: ' + window.CrumbleUI.formatCurrency(item.unitPrice) + '</p>' +
              '<div class="d-flex align-items-center gap-2">' +
                '<label class="small text-muted">Cantidad</label>' +
                '<input class="form-control form-control-sm js-cart-qty" data-id="' + item.productId + '" type="number" min="1" value="' + item.quantity + '" style="width:90px">' +
              '</div>' +
            '</div>' +
            '<div class="text-end">' +
              '<strong class="d-block mb-2">' + window.CrumbleUI.formatCurrency(item.lineTotal) + '</strong>' +
              '<button class="btn btn-outline-danger btn-sm js-remove-cart" data-id="' + item.productId + '">Eliminar</button>' +
            '</div>' +
          '</div>';
      }).join(""));
    }

    $("#subtotalValue, #totalValue").text(window.CrumbleUI.formatCurrency(subtotal));
  }

  $(document).on("click", ".js-add-cart", function () { addToCart($(this).data("id")); });
  $(document).on("click", "#clearCartBtn", function () { clearCart(); });
  $(document).on("change", ".js-cart-qty", function () { updateQuantity($(this).data("id"), $(this).val()); });
  $(document).on("click", ".js-remove-cart", function () { removeItem($(this).data("id")); });

  $(function () { renderCartPage(); });

  window.CrumbleCart = {
    addToCart: addToCart,
    renderCartPage: renderCartPage,
    clearCart: clearCart,
    cartDetails: cartDetails
  };
})(window, jQuery);
