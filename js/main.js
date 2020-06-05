'use strict';

var OFFER_PRICE_RANGE = [500, 100000];
var OFFER_ROOMS_RANGE = [1, 8];
var OFFER_GUESTS_RANGE = [1, 5];

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner', 'description'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var PINS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var PIN_Y_RANGE = [130, 630];

document.querySelector('.map').classList.remove('map--faded');

var map = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var pinsXRange = [0 - PIN_WIDTH / 2, map.offsetWidth - PIN_WIDTH / 2];
var pinsYRange = [PIN_Y_RANGE[0] - PIN_HEIGHT, PIN_Y_RANGE[1] - PIN_HEIGHT];

var offer = {
  price: OFFER_PRICE_RANGE,
  rooms: OFFER_ROOMS_RANGE,
  guests: OFFER_GUESTS_RANGE,
  type: OFFER_TYPES,
  times: OFFER_TIMES,
  features: OFFER_FEATURES,
  photos: OFFER_PHOTOS
};

var pin = {
  count: PINS_COUNT,
  x: pinsXRange,
  y: pinsYRange
};

var getRandomItemFromArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomItemFromRange = function (range) {
  return Math.floor(range[0] + Math.random() * (range[1] - range[0] + 1));
};

var getArrayRandomLength = function (array) {
  return array.slice(0, Math.floor(Math.random() * array.length));
};

var createData = function (offer_obj, pin_obj) {
  var array = [];
  for (var i = 0; i < pin_obj.count; i++) {
    array.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png',
          },
          'offer': {
            'title': 'Заголовок ' + (i + 1),
            'address': getRandomItemFromRange(pin_obj.x) + ', ' + getRandomItemFromRange(pin_obj.y),
            'price': getRandomItemFromRange(offer_obj.price),
            'type': getRandomItemFromArray(offer_obj.type),
            'rooms': getRandomItemFromRange(offer_obj.rooms),
            'guests': getRandomItemFromRange(offer_obj.guests),
            'checkin': getRandomItemFromArray(offer_obj.times),
            'features': getArrayRandomLength(offer_obj.features),
            'description': 'Описание ' + (i + 1),
            'photos': getArrayRandomLength(offer_obj.photos)
          },
          'location': {
            'x': getRandomItemFromRange(pin_obj.x),
            'y': getRandomItemFromRange(pin_obj.y)
          }
        }
    );

  }
  return array;
};

var renderPin = function (data) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = data.location.x + 'px';
  pinElement.style.top = data.location.y + 'px';
  pinImage.setAttribute('src', data.author.avatar);
  pinImage.setAttribute('alt', data.offer.title);
  return pinElement;
};

var addPinsToMap = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  mapPinsList.appendChild(fragment);
};

var data = createData(offer, pin);
addPinsToMap(data);
