'use strict';
(function () {

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (offerData) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var pinImage = pinElement.querySelector('img');
    pinElement.setAttribute('data-id', offerData.offer.id);
    pinElement.style.left = (offerData.location.x - window.data.PinData.WIDTH / 2) + 'px';
    pinElement.style.top = (offerData.location.y - window.data.PinData.HEIGHT) + 'px';
    pinImage.src = offerData.author.avatar;
    pinImage.alt = offerData.offer.title;
    return pinElement;
  };

  window.pin = {
    createPin: createPin
  };

})();
