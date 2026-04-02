(function (window, $) {
  function updateCartBadge() {
    var count = window.CrumbleStore.getCart().reduce(function (sum, item) {
      return sum + Number(item.quantity || 0);
    }, 0);
    $("#cartCountBadge").text(count);
  }

  function applyConfig() {
    var config = window.CrumbleStore.getConfig();
    if ($("#heroTitle").length) { $("#heroTitle").text(config.heroTitle || ""); }
    if ($("#heroText").length) { $("#heroText").text(config.heroText || ""); }
    if ($("#heroButtonText").length) { $("#heroButtonText").text(config.heroButtonText || "Ordena ahora"); }
    if ($("#weeklyLabel").length) { $("#weeklyLabel").text(config.weeklyLabel || "Sabores de esta semana"); }
  }

  $(function () {
    window.CrumbleStore.init();
    applyConfig();
    updateCartBadge();
  });

  window.CrumbleApp = {
    updateCartBadge: updateCartBadge,
    applyConfig: applyConfig
  };
})(window, jQuery);
