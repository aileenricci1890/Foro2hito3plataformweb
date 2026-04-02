(function (window) {
  var keys = {
    products: "cc_products",
    cart: "cc_cart",
    orders: "cc_orders",
    locations: "cc_locations",
    config: "cc_site_config"
  };

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  function normalizeProductImages(products) {
    var map = {
      Choco: "chocolate-chunk.png",
      Berry: "strawberry-cream.png",
      Cake: "carrot-cake-cookie.png",
      Lemon: "lemon-glaze.png",
      Brown: "brownie-batter.png",
      Shake: "pink-velvet-milkshake.png"
    };

    return (products || []).map(function (product) {
      if (map[product.image]) {
        product.image = map[product.image];
      }
      if (!product.image) {
        product.image = "placeholder-product.png";
      }
      return product;
    });
  }

  function init() {
    if (!read(keys.products, null)) { write(keys.products, clone(window.CrumbleSeed.products)); }
    if (!read(keys.locations, null)) { write(keys.locations, clone(window.CrumbleSeed.locations)); }
    if (!read(keys.config, null)) { write(keys.config, clone(window.CrumbleSeed.config)); }
    if (!read(keys.cart, null)) { write(keys.cart, []); }
    if (!read(keys.orders, null)) { write(keys.orders, []); }

    write(keys.products, normalizeProductImages(read(keys.products, [])));
  }

  function resetSeeds() {
    write(keys.products, clone(window.CrumbleSeed.products));
    write(keys.locations, clone(window.CrumbleSeed.locations));
    write(keys.config, clone(window.CrumbleSeed.config));
    write(keys.cart, []);
    write(keys.orders, []);
  }

  function generateId(prefix) {
    return prefix + "-" + Date.now();
  }

  window.CrumbleStore = {
    keys: keys,
    init: init,
    resetSeeds: resetSeeds,
    generateId: generateId,
    read: read,
    write: write,
    getProducts: function () { return read(keys.products, []); },
    setProducts: function (items) { write(keys.products, items); },
    getCart: function () { return read(keys.cart, []); },
    setCart: function (items) { write(keys.cart, items); },
    getOrders: function () { return read(keys.orders, []); },
    setOrders: function (items) { write(keys.orders, items); },
    getLocations: function () { return read(keys.locations, []); },
    setLocations: function (items) { write(keys.locations, items); },
    getConfig: function () { return read(keys.config, {}); },
    setConfig: function (item) { write(keys.config, item); }
  };
})(window);
