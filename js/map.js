'use strict';
(function () {

  var map = document.querySelector('.map');
  var mapPinsList = document.querySelector('.map__pins');
  var mapFilterContainer = document.querySelector('.map__filters-container');

  var offers = [];

  var addPinsToMap = function (items) {
    offers = items;
    var count = offers.length;
    var maxCount = window.data.PinData.COUNT;
    var pinsCount = count <= maxCount ? count : maxCount;
    var pins = document.createDocumentFragment();

    for (var i = 0; i < pinsCount; i++) {
      pins.appendChild(window.pin.createPin(items[i], i));
    }

    mapPinsList.appendChild(pins);
  };

  var removePinsFromMap = function () {
    var children = mapPinsList.querySelectorAll('button.map__pin:not(.map__pin--main)');

    for (var i = 0; i < children.length; i++) {
      children[i].remove();
    }
  };

  var updatePins = function (filteredOffers) {
    closeCard();
    removePinsFromMap();
    addPinsToMap(filteredOffers);
  };

  var loadOffers = function (callback) {
    var onLoad = function (response) {
      offers = response;
      callback(offers);
    };
    var onError = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'text-align: center; background-color: rgba(255, 86, 53, 0.7); color: white; font-size: 20px; padding: 10px; margin: 0 0 20px;';
      node.textContent = errorMessage;
      mapFilterContainer.insertAdjacentElement('afterbegin', node);
    };
    window.backend.load(onLoad, onError);
  };

  var addCardToMap = function (currentIndex) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      if (i.toString() === currentIndex) {
        fragment.appendChild(window.card.renderCard(offers[i], currentIndex));
        break;
      }
    }

    map.insertBefore(fragment, mapFilterContainer);
  };

  var openCard = function (offerId) {
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

  var closeCard = function () {
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
      openCard(offerId);
    }

    var isBtnClosePopup = targetElement.matches('.popup__close');
    var isBtnEsc = evt.key === 'Escape' ? true : false;
    if (isBtnClosePopup || isBtnEsc) {
      closeCard(evt, targetElement);
    }
  };

  var init = function () {
    loadOffers(window.filterForm.init);
    map.classList.remove('map--faded');
    map.addEventListener('click', onMapEvent);
    map.addEventListener('keydown', onMapEvent);
  };

  var destroy = function () {
    removePinsFromMap();
    closeCard();
    window.filterForm.destroy();
    map.classList.add('map--faded');
    map.removeEventListener('click', onMapEvent);
    map.removeEventListener('keydown', onMapEvent);
  };

  window.map = {
    updatePins: updatePins,
    init: init,
    destroy: destroy
  };

})();
