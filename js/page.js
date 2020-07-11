'use strict';

(function () {
  var enable = function () {
    window.map.init();
    window.adForm.init();
  };

  var disable = function () {
    window.map.destroy();
    window.adForm.destroy();
  };

  disable();

  window.page = {
    disable: disable,
    enable: enable
  };
})();
