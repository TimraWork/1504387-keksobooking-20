'use strict';

(function () {

  var mapMainPin = document.querySelector('.map__pin--main');
  var isPageEnabled = false;

  var disablePage = function () {
    window.map.destroy();
    window.adForm.destroy();
    isPageEnabled = false;
  };
  disablePage();

  var enablePage = function (evt) {
    if ((evt.key === 'Enter' || evt.button === 0) && !isPageEnabled) {
      window.map.init();
      window.adForm.init();
      isPageEnabled = true;
    }
  };

  mapMainPin.addEventListener('mousedown', enablePage);
  mapMainPin.addEventListener('keydown', enablePage);

  window.main = {
    disablePage: disablePage
  };

})();
