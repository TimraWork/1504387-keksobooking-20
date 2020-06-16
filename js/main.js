'use strict';

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

var map = document.querySelector('.map');
var mapMainPin = document.querySelector('.map__pin--main');
var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var mapFilterContainer = document.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var pinsXRange = [PinData.WIDTH / 2, map.offsetWidth - PinData.WIDTH / 2];
var pinsYRange = [PinData.Y[0] + PinData.HEIGHT, PinData.Y[1] + PinData.HEIGHT];

var getRandomItemFromArray = function (array) {
  return array[Math.floor(Math.random() * (array.length))];
};

var getRandomItemFromRange = function (range) {
  return Math.floor(range[0] + Math.random() * (range[1] - range[0] + 1));
};

var getArrayRandomLength = function (array) {
  return array.slice(0, Math.random() * (array.length + 1));
};

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
            'title': getRandomItemFromArray(offerData.TITLES),
            'address': getRandomItemFromRange(pinsXRange) + ', ' + getRandomItemFromRange(pinsYRange),
            'price': getRandomItemFromRange(offerData.PRICE),
            'type': getRandomItemFromArray(offerData.TYPES),
            'rooms': getRandomItemFromRange(offerData.ROOMS),
            'guests': getRandomItemFromRange(offerData.GUESTS),
            'checkin': getRandomItemFromArray(offerData.TIMES),
            'checkout': getRandomItemFromArray(offerData.TIMES),
            'features': getArrayRandomLength(offerData.FEATURES),
            'description': getRandomItemFromArray(offerData.DESCRIPTION),
            'photos': getArrayRandomLength(offerData.PHOTOS)
          },
          'location': {
            'x': getRandomItemFromRange(pinsXRange),
            'y': getRandomItemFromRange(pinsYRange)
          }
        }
    );
  }
  return offers;
};

var offers = getOffers(OffersData, PinData);

var createPin = function (offerData) {
  var pinElement = mapPinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.setAttribute('data-id', offerData.offer.id);
  pinElement.style.left = (offerData.location.x - PinData.WIDTH / 2) + 'px';
  pinElement.style.top = (offerData.location.y - PinData.HEIGHT) + 'px';
  pinImage.src = offerData.author.avatar;
  pinImage.alt = offerData.offer.title;
  return pinElement;
};

var addPinsToMap = function () {
  var pins = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    pins.appendChild(createPin(offers[i]));
  }
  mapPinsList.appendChild(pins);
};


var createFeaturesList = function (offerData) {
  var featuresList = document.createDocumentFragment();
  for (var i = 0; i < offerData.offer.features.length; i++) {
    var newListItem = document.createElement('li');
    newListItem.classList.add('popup__feature', 'popup__feature--' + offerData.offer.features[i]);
    featuresList.appendChild(newListItem);
  }
  return featuresList;
};

var createImagesList = function (offerData) {
  var imagesList = document.createDocumentFragment();
  for (var i = 0; i < offerData.offer.photos.length; i++) {
    var newImageItem = document.createElement('img');
    newImageItem.classList.add('popup__photo');
    newImageItem.setAttribute('src', offerData.offer.photos[i]);
    newImageItem.setAttribute('alt', '');
    newImageItem.setAttribute('width', 45);
    newImageItem.setAttribute('height', 40);
    imagesList.appendChild(newImageItem);
  }
  return imagesList;
};

var renderCard = function (offerData) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.setAttribute('data-id', offerData.offer.id);

  cardElement.querySelector('.popup__title').textContent = offerData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offerData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = offerData.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = offerData.offer.type.title;
  cardElement.querySelector('.popup__text--capacity').textContent = offerData.offer.rooms + ' комнаты для ' + offerData.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerData.offer.checkin + ' выезд до ' + offerData.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = offerData.offer.description;
  cardElement.querySelector('.popup__avatar').setAttribute('src', offerData.author.avatar);
  cardElement.querySelector('.popup__features').innerHTML = '';
  cardElement.querySelector('.popup__features').appendChild(createFeaturesList(offerData));
  cardElement.querySelector('.popup__photos').innerHTML = '';
  cardElement.querySelector('.popup__photos').appendChild(createImagesList(offerData));

  return cardElement;
};

var addPopupToMap = function (offerId) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    if (offerId === offers[i].offer.id) {
      fragment.appendChild(renderCard(offers[i]));
      break;
    }
  }
  map.insertBefore(fragment, mapFilterContainer);
};

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

var openPopup = function (offerId) {
  var currentPopup = document.querySelector('.map .map__card');
  if (currentPopup) {
    var currentPopupId = currentPopup.getAttribute('data-id');
    currentPopup.remove();
    if (currentPopupId !== offerId) {
      addPopupToMap(offerId);
    }
  } else {
    addPopupToMap(offerId);
  }
};

var closePopup = function () {
  var currentPopup = document.querySelector('.map .map__card');
  if (currentPopup) {
    currentPopup.remove();
  }
};

var getClosestElement = function (element, selector) {
  while (element) {
    if (element.matches(selector)) {
      return element;
    } else {
      element = element.parentElement;
    }
  }
  return null;
};

var onMapEvent = function (evt) {
  var targetElement = evt.target;
  var pinBtn = getClosestElement(targetElement, '.map__pin:not(.map__pin--main)');

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

var getMainPinPosition = function (isFullHeigth) {
  var pinHeight = isFullHeigth ? MainPinData.FULL_HEIGHT : MainPinData.HEIGHT / 2;
  return (mapMainPin.offsetLeft + Math.round(MainPinData.WIDTH / 2)) + ', ' + (mapMainPin.offsetTop + pinHeight);
};

var addressInput = document.querySelector('#address');

var disablePage = function () {
  toggleFormInputs(mapFilterInputs, true);
  toggleFormInputs(adFormInputs, true);
  addressInput.value = getMainPinPosition();

  map.removeEventListener('click', onMapEvent);
  map.removeEventListener('keydown', onMapEvent);

};
disablePage();

var enablePage = function (evt) {
  if ((evt.key === 'Enter' || evt.button === 0) && adForm.matches('.ad-form--disabled')) {
    addPinsToMap(offers);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    toggleFormInputs(mapFilterInputs);
    toggleFormInputs(adFormInputs);
    addressInput.value = getMainPinPosition(true);

    map.addEventListener('click', onMapEvent);
    map.addEventListener('keydown', onMapEvent);
  }
};
mapMainPin.addEventListener('mousedown', enablePage);
mapMainPin.addEventListener('keydown', enablePage);

var houseTypeSelect = document.querySelector('#type');
var priceInput = document.querySelector('#price');
var getHouseTypeMinPrice = function () {
  var minPrice = 0;
  for (var i = 0; i < OffersData.TYPES.length; i++) {
    if (OffersData.TYPES[i].NAME === houseTypeSelect.value) {
      minPrice = OffersData.TYPES[i].MIN_PRICE;
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
