'use strict';

(function () {
  var PINS_COUNT = 5;

  var map = document.querySelector('.map');
  var mapPinsList = document.querySelector('.map__pins');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var offers = [];

  var addPinsToMap = function () {
    var pins = document.createDocumentFragment();

    for (var i = 0; i < Math.min(offers.length, PINS_COUNT); i++) {
      pins.appendChild(window.pin.create(offers[i], i));
    }

    mapPinsList.appendChild(pins);
    initPinsHandlers();
  };

  var getPinsElements = function () {
    return mapPinsList.querySelectorAll('.map__pin:not(.map__pin--main)');
  };

  var removePinsFromMap = function () {
    var pins = getPinsElements();

    pins.forEach(function (pin) {
      pin.remove();
    });
  };

  var initPinsHandlers = function () {
    var pins = getPinsElements();

    pins.forEach(function (pin) {
      pin.onclick = function (evt) {
        var pinBtn = window.utils.getClosestElement(evt.target, '.map__pin:not(.map__pin--main)');
        var offerId = pinBtn.getAttribute('data-id');
        openCard(offerId);
      };
    });
  };

  var updatePins = function (filteredOffers) {
    offers = filteredOffers;
    closeCard();
    removePinsFromMap();
    addPinsToMap();
  };

  var loadOffers = function (callback) {
    var onLoad = function (response) {
      offers = response;
      callback(offers);
    };

    window.backend.load(onLoad, window.utils.showErrorNotification);
  };

  var addCardToMap = function (id, callback) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      if (i.toString() === id) {
        fragment.appendChild(window.card.create(offers[i], id));
        break;
      }
    }

    map.insertBefore(fragment, mapFilterContainer);
    callback();
  };

  var onDocumentClick = function (evt) {
    if (window.utils.isEscapePressed(evt)) {
      closeCard();
    }
  };

  var initCardHandlers = function () {
    var btnClosePopup = map.querySelector('.popup__close');

    btnClosePopup.onclick = function () {
      closeCard();
    };

    btnClosePopup.onkeydown = function (evt) {
      if (window.utils.isEnterPressed(evt)) {
        closeCard();
      }
    };

    document.addEventListener('keydown', onDocumentClick);
  };

  var openCard = function (offerId) {
    var currentCard = document.querySelector('.map .map__card');

    if (currentCard) {
      var currentCardId = currentCard.getAttribute('data-id');
      currentCard.remove();

      if (currentCardId !== offerId) {
        addCardToMap(offerId, initCardHandlers);
      }
    } else {
      addCardToMap(offerId, initCardHandlers);
    }
  };

  var closeCard = function () {
    var currentCard = document.querySelector('.map .map__card');

    if (currentCard) {
      currentCard.remove();
      document.removeEventListener('keydown', onDocumentClick);
    }
  };

  var init = function () {
    window.pinMain.init();
    loadOffers(window.filterForm.init);
    map.classList.remove('map--faded');
  };

  var destroy = function () {
    removePinsFromMap();
    closeCard();
    window.pinMain.reset();
    window.filterForm.destroy();
    map.classList.add('map--faded');
  };

  window.map = {
    init: init,
    destroy: destroy,
    updatePins: updatePins
  };
})();
