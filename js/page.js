'use strict';

(function () {
  var enable = function () {
    window.adForm.init();
    window.map.init();
  };

  var disable = function () {
    window.adForm.destroy();
    window.map.destroy();
  };

  disable();

  window.page = {
    disable: disable,
    enable: enable
  };
})();
