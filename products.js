(function (window, $) {
  var currentFilter = "all";

  function activeProducts() {
    return window.CrumbleStore.getProducts().filter(function (product) {
      return product.active;
    });
  }

  function renderHome() {
    if (!$("#weeklyProducts").length) { return; }

    var products = activeProducts();
    var weekly = products.filter(function (item) { return item.weekly; }).slice(0, 3);
    var classic = products.filter(function (item) { return item.category === "classic"; }).slice(0, 3);
    var locations = window.CrumbleStore.getLocations().slice(0, 3);

    $("#weeklyProducts").html(weekly.map(window.CrumbleUI.productCard).join("") || window.CrumbleUI.emptyState("Sin sabores semanales", "Agrega productos marcados como semanales desde el admin."));
    $("#classicProducts").html(classic.map(window.CrumbleUI.productCard).join("") || window.CrumbleUI.emptyState("Sin clasicos", "Activa productos clasicos para mostrarlos aqui."));
    $("#featuredLocations").html(locations.map(window.CrumbleUI.locationCard).join(""));
  }

  function filterProducts(products, search) {
    return products.filter(function (product) {
      var nameMatch = product.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
      var categoryMatch = currentFilter === "all" ||
        (currentFilter === "weekly" && product.weekly) ||
        product.category === currentFilter;
      return nameMatch && categoryMatch;
    });
  }

  function renderMenu() {
    if (!$("#menuProducts").length) { return; }
    var search = $("#searchInput").val() || "";
    var products = filterProducts(activeProducts(), search);

    if (!products.length) {
      $("#menuProducts").html(window.CrumbleUI.emptyState("No hay resultados", "Prueba otro filtro o cambia la busqueda."));
      return;
    }

    $("#menuProducts").html(products.map(window.CrumbleUI.productCard).join(""));
  }

  function renderLocations() {
    if (!$("#locationsGrid").length) { return; }
    var locations = window.CrumbleStore.getLocations();
    $("#locationsGrid").html(locations.map(window.CrumbleUI.locationCard).join("") || window.CrumbleUI.emptyState("Sin ubicaciones", "Agrega sucursales desde el panel admin."));
  }

  function openProductModal(productId) {
    var product = window.CrumbleStore.getProducts().find(function (item) { return item.id === productId; });
    if (!product || !$("#productModalContent").length) { return; }

    $("#productModalContent").html(
      '<div class="modal-product-layout">' +
        '<div class="modal-product-media d-flex align-items-center justify-content-center">' +
          '<img class="product-image h-100" src="' + window.CrumbleUI.assetPath(product.image) + '" alt="' + product.name + '">' +
        '</div>' +
        '<div class="modal-product-content">' +
          '<span class="eyebrow">' + (product.weekly ? "Weekly Favorite" : "Signature Item") + '</span>' +
          '<h2 class="mb-3">' + product.name + '</h2>' +
          '<p class="text-muted">' + product.longDescription + '</p>' +
          '<p class="h5 mb-4">' + window.CrumbleUI.formatCurrency(product.price) + '</p>' +
          '<div class="d-flex gap-2">' +
            '<button class="btn btn-dark rounded-pill flex-grow-1 js-add-cart" data-id="' + product.id + '" data-bs-dismiss="modal">Agregar al carrito</button>' +
            '<button class="btn btn-outline-secondary rounded-pill" data-bs-dismiss="modal">Cerrar</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
    bootstrap.Modal.getOrCreateInstance(document.getElementById("productModal")).show();
  }

  $(document).on("click", ".js-open-product", function () { openProductModal($(this).data("id")); });
  $(document).on("click", ".btn-filter", function () {
    $(".btn-filter").removeClass("active");
    $(this).addClass("active");
    currentFilter = $(this).data("filter");
    renderMenu();
  });
  $(document).on("input", "#searchInput", function () { renderMenu(); });

  $(function () {
    renderHome();
    renderMenu();
    renderLocations();
  });
})(window, jQuery);
