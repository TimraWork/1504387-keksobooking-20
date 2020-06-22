'use strict';
(function () {

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
    WIDTH: 65,
    HEIGHT: 65,
    FULL_HEIGHT: 78
  };

  window.data = {
    OffersData: OffersData,
    PinData: PinData,
    MainPinData: MainPinData
  };

})();
