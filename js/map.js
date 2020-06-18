'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapPinsList = document.querySelector('.map__pins');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapFilterElements = document.querySelectorAll('.map__filters > *');

  var addCardToMap = function (offerId) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.offers.length; i++) {
      if (offerId === window.data.offers[i].offer.id) {
        fragment.appendChild(window.card.renderCard(window.data.offers[i]));
        break;
      }
    }
    map.insertBefore(fragment, mapFilterContainer);
  };

  var addPinsToMap = function () {
    var pins = document.createDocumentFragment();
    for (var i = 0; i < window.data.offers.length; i++) {
      pins.appendChild(window.pin.createPin(window.data.offers[i]));
    }
    mapPinsList.appendChild(pins);
  };

  var removePinsFromMap = function () {
    var children = mapPinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < children.length; i++) {
      mapPinsList.innerHTML = '';
    }
  };

  var openPopup = function (offerId) {
    var currentPopup = document.querySelector('.map .map__card');
    if (currentPopup) {
      var currentPopupId = currentPopup.getAttribute('data-id');
      currentPopup.remove();
      if (currentPopupId !== offerId) {
        addCardToMap(offerId);
      }
    } else {
      addCardToMap(offerId);
    }
  };

  var closePopup = function () {
    var currentPopup = document.querySelector('.map .map__card');
    if (currentPopup) {
      currentPopup.remove();
    }
  };

  var onMapEvent = function (evt) {
    var targetElement = evt.target;
    var pinBtn = window.util.getClosestElement(targetElement, '.map__pin:not(.map__pin--main)');

    if (pinBtn && evt.type !== 'keydown') {
      var offerId = pinBtn.getAttribute('data-id');
      openPopup(offerId);
    }

    var isBtnClosePopup = targetElement.matches('.popup__close');
    var isBtnEsc = evt.key === 'Escape' ? true : false;
    if (isBtnClosePopup || isBtnEsc) {
      closePopup(evt, targetElement);
    }
  };

  var init = function () {
    addPinsToMap(window.data.offers);
    window.util.enableFormElements(mapFilterElements);
    map.classList.remove('map--faded');
    map.addEventListener('click', onMapEvent);
    map.addEventListener('keydown', onMapEvent);
  };

  var destroy = function () {
    removePinsFromMap(window.data.offers);
    window.util.disableFormElements(mapFilterElements);
    map.classList.add('map--faded');
    map.removeEventListener('click', onMapEvent);
    map.removeEventListener('keydown', onMapEvent);
  };

  window.map = {
    init: init,
    destroy: destroy
  };

})();
