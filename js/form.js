'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormElements = document.querySelectorAll('.ad-form > *');
  var addressInput = document.querySelector('#address');

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

  var mainElement = document.querySelector('main');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var messageElement;

  var createMessage = function () {
    messageElement.addEventListener('click', onMessageClose);
    document.body.addEventListener('keydown', onMessageClose);
    mainElement.insertAdjacentElement('afterbegin', messageElement);
  };

  var onMessageClose = function (evt) {
    if (evt.key === 'Escape' || evt.button === 0) {
      messageElement.removeEventListener('click', onMessageClose);
      document.body.removeEventListener('keydown', onMessageClose);
      messageElement.remove();
    }
  };

  var onLoad = function () {
    messageElement = successTemplate.cloneNode(true);
    createMessage();
    window.main.disablePage();
  };

  var onError = function () {
    messageElement = errorTemplate.cloneNode(true);
    createMessage();
  };

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), onLoad, onError);
    evt.preventDefault();
  });

  var adFormReset = function () {
    adForm.reset();
    window.pinMain.setToStart();
    addressInput.value = window.pinMain.getPosition();
  };

  var adFormResetBtn = document.querySelector('.ad-form__reset');

  adFormResetBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    adFormReset();
  });

  var init = function () {
    adForm.classList.remove('ad-form--disabled');
    window.util.enableFormElements(adFormElements);
    addressInput.value = window.pinMain.getPosition(true);
  };

  var destroy = function () {
    adForm.classList.add('ad-form--disabled');
    window.util.disableFormElements(adFormElements);
    adFormReset();
  };

  window.form = {
    init: init,
    destroy: destroy
  };

})();
