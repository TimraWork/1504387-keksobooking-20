'use strict';
(function () {

  var map = document.querySelector('.map');

  var OffersData = {
    TITLES: ['Заголовок 1', 'Заголовок 2', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'],
    PRICE: [500, 100000],
    ROOMS: [1, 8],
    GUESTS: [1, 5],
    TYPES: [
      {NAME: 'palace', TITLE: 'Дворец', MIN_PRICE: 10000},
      {NAME: 'flat', TITLE: 'Квартира', MIN_PRICE: 1000},
      {NAME: 'house', TITLE: 'Дом', MIN_PRICE: 5000},
      {NAME: 'bungalo', TITLE: 'Бунгало', MIN_PRICE: 0}
    ],
    TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    DESCRIPTION: ['Описание 1', 'Описание 2', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'],
    PHOTOS: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
  };

  var PinData = {
    COUNT: 8,
    WIDTH: 50,
    HEIGHT: 70,
    Y: [130, 630]
  };

  var MainPinData = {
    WIDTH: 60,
    HEIGHT: 60,
    FULL_HEIGHT: 80
  };

  var pinsXRange = [PinData.WIDTH / 2, map.offsetWidth - PinData.WIDTH / 2];
  var pinsYRange = [PinData.Y[0] + PinData.HEIGHT, PinData.Y[1] + PinData.HEIGHT];

  var getOffers = function (offerData, pinData) {
    var offers = [];
    for (var i = 0; i < pinData.COUNT; i++) {
      offers.push(
          {
            'author': {
              'avatar': 'img/avatars/user0' + (i + 1) + '.png',
            },
            'offer': {
              'id': (i + 1).toString(),
              'title': window.util.getRandomItemFromArray(offerData.TITLES),
              'address': window.util.getRandomItemFromRange(pinsXRange) + ', ' + window.util.getRandomItemFromRange(pinsYRange),
              'price': window.util.getRandomItemFromRange(offerData.PRICE),
              'type': window.util.getRandomItemFromArray(offerData.TYPES),
              'rooms': window.util.getRandomItemFromRange(offerData.ROOMS),
              'guests': window.util.getRandomItemFromRange(offerData.GUESTS),
              'checkin': window.util.getRandomItemFromArray(offerData.TIMES),
              'checkout': window.util.getRandomItemFromArray(offerData.TIMES),
              'features': window.util.getArrayRandomLength(offerData.FEATURES),
              'description': window.util.getRandomItemFromArray(offerData.DESCRIPTION),
              'photos': window.util.getArrayRandomLength(offerData.PHOTOS)
            },
            'location': {
              'x': window.util.getRandomItemFromRange(pinsXRange),
              'y': window.util.getRandomItemFromRange(pinsYRange)
            }
          }
      );
    }
    return offers;
  };

  var offers = getOffers(OffersData, PinData);

  window.data = {
    OffersData: OffersData,
    PinData: PinData,
    MainPinData: MainPinData,
    offers: offers
  };

})();
