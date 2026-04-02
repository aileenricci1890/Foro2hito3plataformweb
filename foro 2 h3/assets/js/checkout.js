(function (window, $) {
  function populateStores() {
    if (!$("#storeId").length) { return; }
    var locations = window.CrumbleStore.getLocations();
    $("#storeId").html(locations.map(function (location) {
      return '<option value="' + location.id + '">' + location.name + " - " + location.city + '</option>';
    }).join(""));
  }

  function toggleAddressField() {
    var isDelivery = $("#deliveryType").val() === "delivery";
    $("#addressGroup").toggle(isDelivery);
    $("#address").prop("required", isDelivery);
  }

  function createOrder() {
    var items = window.CrumbleCart.cartDetails();
    if (!items.length) {
      window.CrumbleUI.toast("Tu carrito esta vacio");
      return;
    }

    var subtotal = items.reduce(function (sum, item) { return sum + item.lineTotal; }, 0);
    var orders = window.CrumbleStore.getOrders();
    orders.unshift({
      id: window.CrumbleStore.generateId("order"),
      customerName: $("#customerName").val().trim(),
      phone: $("#phone").val().trim(),
      deliveryType: $("#deliveryType").val(),
      address: $("#address").val().trim(),
      storeId: $("#storeId").val(),
      notes: $("#notes").val().trim(),
      items: items,
      subtotal: subtotal,
      total: subtotal,
      createdAt: new Date().toISOString()
    });

    window.CrumbleStore.setOrders(orders);
    window.CrumbleCart.clearCart();
    $("#checkoutForm")[0].reset();
    toggleAddressField();
    window.CrumbleUI.toast("Pedido registrado correctamente");
  }

  $(document).on("change", "#deliveryType", function () { toggleAddressField(); });

  $(document).on("submit", "#checkoutForm", function (event) {
    event.preventDefault();
    if (!$("#customerName").val().trim() || !$("#phone").val().trim()) {
      window.CrumbleUI.toast("Completa nombre y telefono");
      return;
    }
    if ($("#deliveryType").val() === "delivery" && !$("#address").val().trim()) {
      window.CrumbleUI.toast("Ingresa la direccion para delivery");
      return;
    }
    createOrder();
  });

  $(function () {
    populateStores();
    toggleAddressField();
  });
})(window, jQuery);
