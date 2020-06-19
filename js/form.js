'use strict';
(function () {
  var mapMainPin = document.querySelector('.map__pin--main');
  var adFormElements = document.querySelectorAll('.ad-form > *');
  var addressInput = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');

  var getMainPinPosition = function (isFullHeigth) {
    var pinHeight = isFullHeigth ? window.data.MainPinData.FULL_HEIGHT : window.data.MainPinData.HEIGHT / 2;
    return (mapMainPin.offsetLeft + Math.round(window.data.MainPinData.WIDTH / 2)) + ', ' + (mapMainPin.offsetTop + pinHeight);
  };

  var houseTypeSelect = document.querySelector('#type');
  var priceInput = document.querySelector('#price');

  var getHouseTypeMinPrice = function () {
    var minPrice = 0;
    for (var i = 0; i < window.data.OffersData.TYPES.length; i++) {
      if (window.data.OffersData.TYPES[i].NAME === houseTypeSelect.value) {
        minPrice = window.data.OffersData.TYPES[i].MIN_PRICE;
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

  var init = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.enableFormElements(adFormElements);
    addressInput.value = getMainPinPosition(true);
  };

  var destroy = function () {
    adForm.classList.add('ad-form--disabled');
    window.util.disableFormElements(adFormElements);
    addressInput.value = getMainPinPosition();
  };

  window.form = {
    init: init,
    destroy: destroy
  };

})();
