'use strict';

var OFFER_DATA = {
  titles: ['Заголовок 1', 'Заголовок 2', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'],
  price: [500, 100000],
  rooms: [1, 8],
  guests: [1, 5],
  types: ['palace', 'flat', 'house', 'bungalo'],
  times: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Описание 1', 'Описание 2', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var PIN_DATA = {
  count: 8,
  y: [130, 630]
};

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var map = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

map.classList.remove('map--faded');

var pinsXRange = [PIN_WIDTH / 2, map.offsetWidth - PIN_WIDTH / 2];
var pinsYRange = [PIN_DATA.y[0] + PIN_HEIGHT, PIN_DATA.y[1] + PIN_HEIGHT];

var getRandomItemFromArray = function (array) {
  return array[Math.floor(Math.random() * (array.length))];
};

var getRandomItemFromRange = function (range) {
  return Math.floor(range[0] + Math.random() * (range[1] - range[0] + 1));
};

var getArrayRandomLength = function (array) {
  return array.slice(0, Math.random() * (array.length + 1));
};

var createData = function (offerObj, pinObj) {
  var array = [];
  for (var i = 0; i < pinObj.count; i++) {
    array.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png',
          },
          'offer': {
            'title': getRandomItemFromArray(offerObj.titles),
            'address': getRandomItemFromRange(pinsXRange) + ', ' + getRandomItemFromRange(pinsYRange),
            'price': getRandomItemFromRange(offerObj.price),
            'type': getRandomItemFromArray(offerObj.types),
            'rooms': getRandomItemFromRange(offerObj.rooms),
            'guests': getRandomItemFromRange(offerObj.guests),
            'checkin': getRandomItemFromArray(offerObj.times),
            'checkout': getRandomItemFromArray(offerObj.times),
            'features': getArrayRandomLength(offerObj.features),
            'description': getRandomItemFromArray(offerObj.description),
            'photos': getArrayRandomLength(offerObj.photos)
          },
          'location': {
            'x': getRandomItemFromRange(pinsXRange),
            'y': getRandomItemFromRange(pinsYRange)
          }
        }
    );
  }
  return array;
};

var renderPin = function (data) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = (data.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (data.location.y - PIN_HEIGHT) + 'px';
  pinImage.src = data.author.avatar;
  pinImage.alt = data.offer.title;
  return pinElement;
};

var addPinsToMap = function (array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(renderPin(array[i]));
  }
  mapPinsList.appendChild(fragment);
};

var data = createData(OFFER_DATA, PIN_DATA);
addPinsToMap(data);
