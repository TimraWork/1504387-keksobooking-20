'use strict';

var OFFER_DATA = {
  titles: ['Заголовок 1', 'Заголовок 2', 'Заголовок 4', 'Заголовок 5', 'Заголовок 6', 'Заголовок 7', 'Заголовок 8'],
  price: [500, 100000],
  rooms: [1, 8],
  guests: [1, 5],
  types: [
    {name: 'palace', title: 'Дворец', minPrice: 10000},
    {name: 'flat', title: 'Квартира', minPrice: 1000},
    {name: 'house', title: 'Дом', minPrice: 5000},
    {name: 'bungalo', title: 'Бунгало', minPrice: 0}
  ],
  times: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  description: ['Описание 1', 'Описание 2', 'Описание 4', 'Описание 5', 'Описание 6', 'Описание 7', 'Описание 8'],
  photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
};

var PIN_DATA = {
  count: 8,
  width: 50,
  height: 70,
  y: [130, 630]
};

var MAIN_PIN_DATA = {
  width: 60,
  height: 60,
  fullHeight: 80
};

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapFilterContainer = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var pinsXRange = [PIN_DATA.width / 2, map.offsetWidth - PIN_DATA.width / 2];
var pinsYRange = [PIN_DATA.y[0] + PIN_DATA.height, PIN_DATA.y[1] + PIN_DATA.height];

var getRandomItemFromArray = function (array) {
  return array[Math.floor(Math.random() * (array.length))];
};

var getRandomItemFromRange = function (range) {
  return Math.floor(range[0] + Math.random() * (range[1] - range[0] + 1));
};

var getArrayRandomLength = function (array) {
  return array.slice(0, Math.random() * (array.length + 1));
};

var getOffers = function (offerObj, pinObj) {
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
  pinElement.style.left = (data.location.x - PIN_DATA.width / 2) + 'px';
  pinElement.style.top = (data.location.y - PIN_DATA.height) + 'px';
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
  cardElement.querySelector('.popup__type').textContent = data.offer.type.title;
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

var addCardsToMap = function (array, countElements) {
  var fragment = document.createDocumentFragment();
  if (!countElements) {
    countElements = array.length;
  }
  for (var i = 0; i < countElements; i++) {
    fragment.appendChild(renderCard(array[i]));
  }
  map.insertBefore(fragment, mapFilterContainer);
  map.insertBefore(fragment, mapFilterContainer);
};
var data = getOffers(OFFER_DATA, PIN_DATA);

var adForm = document.querySelector('.ad-form');
var mapFilterInputs = document.querySelectorAll('.map__filters > *');
var adFormInputs = document.querySelectorAll('.ad-form > *');

var toggleFormInputs = function (selector, isDisabled) {
  for (var i = 0; i < selector.length; i++) {
    if (isDisabled) {
      selector[i].setAttribute('disabled', 'true');
    } else {
      selector[i].removeAttribute('disabled');
    }
  }
};

var addressInput = document.querySelector('#address');

var getMainPinPosition = function (isFullHeigth) {
  var pinHeight = isFullHeigth ? MAIN_PIN_DATA.fullHeight : MAIN_PIN_DATA.height / 2;
  return (mapPinMain.offsetLeft + Math.round(MAIN_PIN_DATA.width / 2)) + ', ' + (mapPinMain.offsetTop + pinHeight);
};

var disablePage = function () {
  toggleFormInputs(mapFilterInputs, true);
  toggleFormInputs(adFormInputs, true);
  addressInput.value = getMainPinPosition();
};
disablePage();

var enablePage = function (evt) {
  if ((evt.key === 'Enter' || evt.button === 0) && adForm.classList.contains('ad-form--disabled')) {
    addPinsToMap(data);
    addCardsToMap(data, 1); // В задании сказано закомментировать, но если я комменчу eslint ругается ...
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    toggleFormInputs(mapFilterInputs);
    toggleFormInputs(adFormInputs);
    addressInput.value = getMainPinPosition(true);
  }
};
mapPinMain.addEventListener('mousedown', enablePage);
mapPinMain.addEventListener('keydown', enablePage);

var houseTypeSelect = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var getHouseTypeMinPrice = function () {
  var minPrice = 0;
  for (var i = 0; i < OFFER_DATA.types.length; i++) {
    if (OFFER_DATA.types[i].name === houseTypeSelect.value) {
      minPrice = OFFER_DATA.types[i].minPrice;
    }
  }
  return minPrice;
};
var onHouseTypeChange = function () {
  var minPrice = getHouseTypeMinPrice();
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
};
houseTypeSelect.addEventListener('change', onHouseTypeChange);

var onTimeChange = function (syncSourse, syncTarget) {
  syncTarget.value = syncSourse.value;
};
var timeInSelect = document.querySelector('#timein');
var timeOutSelect = document.querySelector('#timeout');
timeInSelect.addEventListener('change', function () {
  onTimeChange(timeInSelect, timeOutSelect);
});
timeOutSelect.addEventListener('change', function () {
  onTimeChange(timeOutSelect, timeInSelect);
});

var roomCountSelect = document.querySelector('#room_number');
var guestsSelect = document.querySelector('#capacity');
var questsSelectOptions = guestsSelect.querySelectorAll('option');
var onRoomCountChange = function () {
  var roomsValue = +roomCountSelect.value;
  for (var i = 0; i < questsSelectOptions.length; i++) {
    var guestsOption = guestsSelect.options[i];
    var guestsValue = +guestsOption.value;
    guestsOption.setAttribute('disabled', true);

    if (roomsValue === 100 && guestsValue === 0) {
      guestsOption.removeAttribute('disabled');
    } else

    if (
      roomsValue !== 100
        && roomsValue >= guestsValue
        && guestsValue !== 0
    ) {
      guestsOption.removeAttribute('disabled');
    }
  }
  guestsSelect.value = guestsSelect.querySelector('option:not([disabled])').value;
};
roomCountSelect.addEventListener('change', onRoomCountChange);
