'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form > *');
  var adFormResetBtn = document.querySelector('.ad-form__reset');
  var houseTypeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');
  var checkInSelect = document.querySelector('#timein');
  var checkOutSelect = document.querySelector('#timeout');
  var roomsCountSelect = document.querySelector('#room_number');
  var guestsSelect = document.querySelector('#capacity');
  var guestsSelectOptions = guestsSelect.querySelectorAll('option');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var template;

  var houseTypeMinPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000,
  };
  var roomsForGuests = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var syncPriceByHouseType = function () {
    var minPrice = houseTypeMinPrice[houseTypeSelect.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  var onHouseTypeChange = function () {
    syncPriceByHouseType();
  };

  var syncSelects = function (source, target) {
    target.value = source.value;
  };

  var onCheckInChange = function (evt) {
    syncSelects(evt.target, checkOutSelect);
  };

  var onCheckOutChange = function (evt) {
    syncSelects(evt.target, checkInSelect);
  };

  var syncGuestsByRooms = function () {
    var roomsCount = roomsCountSelect.value;

    guestsSelectOptions.forEach(function (guestOption) {
      var matches = roomsForGuests[roomsCount].indexOf(guestOption.value) !== -1;

      if (matches) {
        guestOption.removeAttribute('disabled');
      } else {
        guestOption.setAttribute('disabled', matches);
      }
    });

    guestsSelect.value = guestsSelect.querySelector('option:not([disabled])').value;
  };

  var onRoomsCountChange = function () {
    syncGuestsByRooms();
  };

  var onLoad = function () {
    template = successTemplate.cloneNode(true);
    window.utils.showPopup(template);
    window.page.disable();
  };

  var onError = function () {
    template = errorTemplate.cloneNode(true);
    window.utils.showPopup(template);
  };

  var onAdFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onLoad, onError);
  };

  var onResetClick = function (evt) {
    evt.preventDefault();
    window.page.disable();
  };

  var init = function () {
    adForm.classList.remove('ad-form--disabled');
    window.utils.enableFormElements(adFormElements);

    houseTypeSelect.addEventListener('change', onHouseTypeChange);
    roomsCountSelect.addEventListener('change', onRoomsCountChange);
    checkInSelect.addEventListener('change', onCheckInChange);
    checkOutSelect.addEventListener('change', onCheckOutChange);
    adForm.addEventListener('submit', onAdFormSubmit);
    adFormResetBtn.addEventListener('click', onResetClick);

    window.adFormPhoto.init();
  };

  var destroy = function () {
    adForm.classList.add('ad-form--disabled');
    window.utils.disableFormElements(adFormElements);

    houseTypeSelect.removeEventListener('change', onHouseTypeChange);
    roomsCountSelect.removeEventListener('change', onRoomsCountChange);
    checkInSelect.removeEventListener('change', onCheckInChange);
    checkOutSelect.removeEventListener('change', onCheckOutChange);
    adForm.removeEventListener('submit', onAdFormSubmit);
    adFormResetBtn.removeEventListener('click', onResetClick);

    window.adFormPhoto.destroy();
    adForm.reset();
    syncPriceByHouseType();
    syncGuestsByRooms();
  };

  window.adForm = {
    init: init,
    destroy: destroy
  };
})();
