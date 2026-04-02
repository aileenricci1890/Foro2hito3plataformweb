(function (window, $) {
  function getProduct(id) {
    return window.CrumbleStore.getProducts().find(function (item) { return item.id === id; });
  }

  function getLocation(id) {
    return window.CrumbleStore.getLocations().find(function (item) { return item.id === id; });
  }

  function fillProductForm(product) {
    $("#productId").val(product.id || "");
    $("#productName").val(product.name || "");
    $("#productCategory").val(product.category || "weekly");
    $("#productPrice").val(product.price || "");
    $("#productShortDescription").val(product.shortDescription || "");
    $("#productLongDescription").val(product.longDescription || "");
    $("#productImageLabel").val(product.image || "");
    $("#productWeekly").prop("checked", !!product.weekly);
    $("#productFeatured").prop("checked", !!product.featured);
    $("#productActive").prop("checked", product.active !== false);
  }

  function fillLocationForm(location) {
    $("#locationId").val(location.id || "");
    $("#locationName").val(location.name || "");
    $("#locationCity").val(location.city || "");
    $("#locationAddress").val(location.address || "");
    $("#locationPhone").val(location.phone || "");
    $("#locationHours").val(location.hours || "");
    $("#locationMapUrl").val(location.mapUrl || "");
  }

  function resetProductForm() { fillProductForm({}); }
  function resetLocationForm() { fillLocationForm({}); }

  function renderStats() {
    var products = window.CrumbleStore.getProducts();
    var orders = window.CrumbleStore.getOrders();
    var locations = window.CrumbleStore.getLocations();
    var weeklyCount = products.filter(function (item) { return item.weekly && item.active; }).length;
    var cards = [
      { label: "Productos activos", value: products.filter(function (item) { return item.active; }).length },
      { label: "Sabores semanales", value: weeklyCount },
      { label: "Sucursales", value: locations.length },
      { label: "Pedidos", value: orders.length }
    ];
    $("#adminStats").html(cards.map(function (card) {
      return '<div class="col-sm-6 col-xl-3"><div class="stats-card"><p>' + card.label + '</p><strong>' + card.value + '</strong></div></div>';
    }).join(""));
  }

  function renderProductsTable() {
    $("#productsTableBody").html(window.CrumbleStore.getProducts().map(function (product) {
      return '<tr><td>' + product.name + '</td><td>' + product.category + '</td><td>' + window.CrumbleUI.formatCurrency(product.price) + '</td><td>' + (product.active ? "Activo" : "Oculto") + '</td><td><button class="btn btn-outline-secondary btn-sm me-2 js-edit-product" data-id="' + product.id + '">Editar</button><button class="btn btn-outline-danger btn-sm js-delete-product" data-id="' + product.id + '">Eliminar</button></td></tr>';
    }).join("") || '<tr><td colspan="5">No hay productos.</td></tr>');
  }

  function renderLocationsTable() {
    $("#locationsTableBody").html(window.CrumbleStore.getLocations().map(function (location) {
      return '<tr><td>' + location.name + '</td><td>' + location.city + '</td><td>' + location.hours + '</td><td><button class="btn btn-outline-secondary btn-sm me-2 js-edit-location" data-id="' + location.id + '">Editar</button><button class="btn btn-outline-danger btn-sm js-delete-location" data-id="' + location.id + '">Eliminar</button></td></tr>';
    }).join("") || '<tr><td colspan="4">No hay sucursales.</td></tr>');
  }

  function renderOrdersTable() {
    $("#ordersTableBody").html(window.CrumbleStore.getOrders().map(function (order) {
      return '<tr><td>' + order.id + '</td><td>' + order.customerName + '</td><td>' + order.deliveryType + '</td><td>' + window.CrumbleUI.formatCurrency(order.total) + '</td><td>' + new Date(order.createdAt).toLocaleString() + '</td></tr>';
    }).join("") || '<tr><td colspan="5">Aun no hay pedidos.</td></tr>');
  }

  function renderAll() {
    renderStats();
    renderProductsTable();
    renderLocationsTable();
    renderOrdersTable();
  }

  $(document).on("submit", "#productForm", function (event) {
    event.preventDefault();
    var products = window.CrumbleStore.getProducts();
    var id = $("#productId").val() || window.CrumbleStore.generateId("prod");
    var newProduct = {
      id: id,
      name: $("#productName").val().trim(),
      category: $("#productCategory").val(),
      price: Number($("#productPrice").val()),
      image: $("#productImageLabel").val().trim() || "placeholder-product.png",
      shortDescription: $("#productShortDescription").val().trim(),
      longDescription: $("#productLongDescription").val().trim(),
      weekly: $("#productWeekly").is(":checked"),
      featured: $("#productFeatured").is(":checked"),
      active: $("#productActive").is(":checked")
    };
    var index = products.findIndex(function (item) { return item.id === id; });
    if (index >= 0) { products[index] = newProduct; } else { products.unshift(newProduct); }
    window.CrumbleStore.setProducts(products);
    resetProductForm();
    renderAll();
    window.CrumbleUI.toast("Producto guardado");
  });

  $(document).on("submit", "#locationForm", function (event) {
    event.preventDefault();
    var locations = window.CrumbleStore.getLocations();
    var id = $("#locationId").val() || window.CrumbleStore.generateId("store");
    var newLocation = {
      id: id,
      name: $("#locationName").val().trim(),
      city: $("#locationCity").val().trim(),
      address: $("#locationAddress").val().trim(),
      phone: $("#locationPhone").val().trim(),
      hours: $("#locationHours").val().trim(),
      mapUrl: $("#locationMapUrl").val().trim()
    };
    var index = locations.findIndex(function (item) { return item.id === id; });
    if (index >= 0) { locations[index] = newLocation; } else { locations.unshift(newLocation); }
    window.CrumbleStore.setLocations(locations);
    resetLocationForm();
    renderAll();
    window.CrumbleUI.toast("Sucursal guardada");
  });

  $(document).on("click", ".js-edit-product", function () {
    var product = getProduct($(this).data("id"));
    if (product) { fillProductForm(product); window.scrollTo({ top: 0, behavior: "smooth" }); }
  });

  $(document).on("click", ".js-delete-product", function () {
    var id = $(this).data("id");
    window.CrumbleStore.setProducts(window.CrumbleStore.getProducts().filter(function (item) { return item.id !== id; }));
    renderAll();
    window.CrumbleUI.toast("Producto eliminado");
  });

  $(document).on("click", ".js-edit-location", function () {
    var location = getLocation($(this).data("id"));
    if (location) { fillLocationForm(location); window.scrollTo({ top: 0, behavior: "smooth" }); }
  });

  $(document).on("click", ".js-delete-location", function () {
    var id = $(this).data("id");
    window.CrumbleStore.setLocations(window.CrumbleStore.getLocations().filter(function (item) { return item.id !== id; }));
    renderAll();
    window.CrumbleUI.toast("Sucursal eliminada");
  });

  $(document).on("click", "#resetSeedBtn", function () {
    window.CrumbleStore.resetSeeds();
    resetProductForm();
    resetLocationForm();
    renderAll();
    window.CrumbleApp.updateCartBadge();
    window.CrumbleUI.toast("Datos restaurados");
  });

  $(document).on("click", "#resetProductFormBtn", function () { resetProductForm(); });
  $(document).on("click", "#resetLocationFormBtn", function () { resetLocationForm(); });

  $(function () {
    if ($("body").data("page") !== "admin") { return; }
    resetProductForm();
    resetLocationForm();
    renderAll();
  });
})(window, jQuery);
