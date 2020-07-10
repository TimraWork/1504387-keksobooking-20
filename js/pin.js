'use strict';

(function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var create = function (offerData, indexElement) {
    var pin = mapPinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');
    var offsetLeft = offerData.location.x - Pin.WIDTH / 2;
    var offsetTop = offerData.location.y - Pin.HEIGHT;

    pin.setAttribute('data-id', indexElement);
    pin.setAttribute('style', 'left: ' + offsetLeft + 'px; top: ' + offsetTop + 'px;');
    pinImage.setAttribute('src', offerData.author.avatar);
    pinImage.setAttribute('alt', offerData.offer.title);

    return pin;
  };

  window.pin = {
    create: create
  };
})();
