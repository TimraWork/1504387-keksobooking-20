'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  var minY = window.data.PinData.Y[0];
  var maxY = window.data.PinData.Y[1];

  var pinHalfWidth = Math.round(window.data.MainPinData.WIDTH / 2);

  var pinРositionY = '';
  var pinPositionX = '';
  var maxXPosition = 0;

  var getPinPosition = function (isFullHeigth) {
    var pinHeight = isFullHeigth ? window.data.MainPinData.FULL_HEIGHT : window.data.MainPinData.HEIGHT / 2;
    return (pinMain.offsetLeft + Math.round(window.data.MainPinData.WIDTH / 2)) + ', ' + (pinMain.offsetTop + pinHeight);
  };

  var onMainPinMove = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      moveEvt.preventDefault();

      addressInput.value = getPinPosition(true);

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinPositionX = pinMain.offsetLeft - shift.x;
      pinРositionY = pinMain.offsetTop - shift.y;

      maxXPosition = map.offsetWidth - pinHalfWidth;

      if (pinPositionX < -pinHalfWidth) {
        pinPositionX = -pinHalfWidth;
      }

      if (pinPositionX > maxXPosition) {
        pinPositionX = maxXPosition;
      }

      if (pinРositionY < minY) {
        pinРositionY = minY;
      }

      if (pinРositionY > maxY) {
        pinРositionY = maxY;
      }

      pinMain.style.left = pinPositionX + 'px';
      pinMain.style.top = pinРositionY + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  pinMain.addEventListener('mousedown', onMainPinMove);

  window.pinMain = {
    getPosition: getPinPosition
  };
})();
