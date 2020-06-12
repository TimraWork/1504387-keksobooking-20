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

var mapFilter = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

var getOffer = function (offerObj, pinObj) {
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

var getOfferType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalo':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return '';
  }
};

var createFeaturesList = function (featuresSelector, data) {
  featuresSelector.innerHTML = '';
  for (var i = 0; i < data.offer.features.length; i++) {
    var newListItem = document.createElement('li');
    newListItem.classList.add('popup__feature', 'popup__feature--' + data.offer.features[i]);
    featuresSelector.appendChild(newListItem);
  }
};

var createImagesList = function (photosSelector, data) {
  photosSelector.innerHTML = '';
  for (var i = 0; i < data.offer.photos.length; i++) {
    var newImageItem = document.createElement('img');
    newImageItem.classList.add('popup__photo');
    newImageItem.setAttribute('src', data.offer.photos[i]);
    newImageItem.setAttribute('alt', '');
    newImageItem.setAttribute('width', 45);
    newImageItem.setAttribute('height', 40);
    photosSelector.appendChild(newImageItem);
  }
};

var renderCard = function (data) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = data.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = getOfferType(data.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ' выезд до ' + data.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = data.offer.description;
  cardElement.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);

  var featuresList = cardElement.querySelector('.popup__features');
  createFeaturesList(featuresList, data);

  var imagesList = cardElement.querySelector('.popup__photos');
  createImagesList(imagesList, data);

  return cardElement;
};

var addCardToMap = function (array, countElements) {
  var fragment = document.createDocumentFragment();
  if (!countElements) {
    countElements = array.length;
  }
  for (var i = 0; i < countElements; i++) {
    fragment.appendChild(renderCard(array[i]));
  }
  map.insertBefore(fragment, mapFilter);
};

var data = getOffer(OFFER_DATA, PIN_DATA);
addPinsToMap(data);
addCardToMap(data, 1);
