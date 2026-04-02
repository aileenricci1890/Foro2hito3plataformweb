(function (window, $) {
  function assetPath(fileName) {
    if (!fileName) {
      return "";
    }
    return $("body").data("page") === "home" ? "assets/img/" + fileName : "../assets/img/" + fileName;
  }

  function formatCurrency(value) {
    return "$" + Number(value || 0).toFixed(2);
  }

  function badgeList(product) {
    var badges = [];
    if (product.weekly) { badges.push('<span class="product-badge">Weekly</span>'); }
    if (product.category === "classic") { badges.push('<span class="product-badge">Classic</span>'); }
    if (product.featured) { badges.push('<span class="product-badge">Top Pick</span>'); }
    return badges.join("");
  }

  function productCard(product) {
    return '' +
      '<div class="col-md-6 col-xl-4">' +
        '<article class="product-card">' +
          '<div class="product-visual">' +
            '<div class="product-badge-stack">' + badgeList(product) + '</div>' +
            '<img class="product-image" src="' + assetPath(product.image) + '" alt="' + product.name + '">' +
          '</div>' +
          '<div class="card-body">' +
            '<div class="d-flex justify-content-between align-items-start gap-3 mb-2">' +
              '<h3 class="h4 mb-0">' + product.name + '</h3>' +
              '<span class="price-chip">' + formatCurrency(product.price) + '</span>' +
            '</div>' +
            '<p class="mb-4 text-muted">' + product.shortDescription + '</p>' +
            '<div class="d-flex gap-2">' +
              '<button class="btn btn-outline-dark rounded-pill flex-grow-1 js-open-product" data-id="' + product.id + '">Ver detalle</button>' +
              '<button class="btn btn-dark rounded-pill flex-grow-1 js-add-cart" data-id="' + product.id + '">Agregar</button>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</div>';
  }

  function locationCard(location) {
    var mapLink = location.mapUrl ? '<a class="btn btn-outline-dark rounded-pill btn-sm" href="' + location.mapUrl + '" target="_blank" rel="noreferrer">Ver mapa</a>' : "";
    return '' +
      '<div class="col-md-6 col-xl-4">' +
        '<article class="location-card h-100">' +
          '<span class="eyebrow mb-2">' + location.city + '</span>' +
          '<h3 class="h4">' + location.name + '</h3>' +
          '<p class="mb-2">' + location.address + '</p>' +
          '<p class="mb-2">Telefono: ' + location.phone + '</p>' +
          '<p class="mb-3">Horario: ' + location.hours + '</p>' +
          mapLink +
        '</article>' +
      '</div>';
  }

  function emptyState(title, text, actionHref, actionText) {
    var action = actionHref ? '<a class="btn btn-dark rounded-pill px-4" href="' + actionHref + '">' + actionText + '</a>' : "";
    return '<div class="empty-state"><h3 class="h4 mb-2">' + title + '</h3><p class="mb-3">' + text + '</p>' + action + '</div>';
  }

  function ensureToastHost() {
    if (!$("#toastHost").length) {
      $("body").append('<div class="toast-container position-fixed top-0 end-0 p-3" id="toastHost"></div>');
    }
  }

  function toast(message) {
    ensureToastHost();
    var id = "toast-" + Date.now();
    $("#toastHost").append(
      '<div id="' + id + '" class="toast align-items-center border-0 text-bg-dark" role="alert" aria-live="assertive" aria-atomic="true">' +
        '<div class="d-flex">' +
          '<div class="toast-body">' + message + '</div>' +
          '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>' +
        '</div>' +
      '</div>'
    );
    var element = document.getElementById(id);
    var bsToast = new bootstrap.Toast(element, { delay: 2200 });
    bsToast.show();
    element.addEventListener("hidden.bs.toast", function () { $(element).remove(); });
  }

  window.CrumbleUI = {
    assetPath: assetPath,
    formatCurrency: formatCurrency,
    productCard: productCard,
    locationCard: locationCard,
    emptyState: emptyState,
    toast: toast
  };
})(window, jQuery);
