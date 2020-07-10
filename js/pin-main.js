'use strict';

(function () {
  var PinData = {
    WIDTH: 65,
    HEIGHT: 65,
    FULL_HEIGHT: 78,
    Y_RANGE: [130, 630]
  };

  var map = document.querySelector('.map');
  var pin = document.querySelector('.map__pin--main');
  var pinHalfWidth = Math.round(PinData.WIDTH / 2);
  var addressInput = document.querySelector('#address');
  var defaultPosition = {
    x: pin.offsetLeft,
    y: pin.offsetTop
  };

  var getPinPosition = function (isFullHeigth) {
    var pinHeight = isFullHeigth ? PinData.FULL_HEIGHT : Math.round(PinData.HEIGHT / 2);
    var pinX = pin.offsetLeft + Math.round(PinData.WIDTH / 2);
    var pinY = pin.offsetTop + pinHeight;

    return pinX + ', ' + pinY;
  };

  var onMainPinMousedown = function (evt) {
    if (window.utils.isMouseLeftClicked(evt)) {
      window.page.enable();
    }
  };

  var onMainPinKeydown = function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.page.enable();
    }
  };

  var init = function () {
    pin.removeEventListener('mousedown', onMainPinMousedown);
    pin.removeEventListener('keydown', onMainPinKeydown);
  };

  var reset = function () {
    pin.setAttribute('style', 'left: ' + defaultPosition.x + 'px; top: ' + defaultPosition.y + 'px;');
    addressInput.setAttribute('value', getPinPosition());

    pin.addEventListener('mousedown', onMainPinMousedown);
    pin.addEventListener('keydown', onMainPinKeydown);
  };

  var setAddress = function () {
    addressInput.setAttribute('value', getPinPosition(true));
  };

  window.move.init({
    element: pin,
    minX: -pinHalfWidth,
    maxX: map.offsetWidth - pinHalfWidth,
    minY: PinData.Y_RANGE[0],
    maxY: PinData.Y_RANGE[1],
    callback: setAddress
  });

  window.pinMain = {
    init: init,
    reset: reset
  };
})();
