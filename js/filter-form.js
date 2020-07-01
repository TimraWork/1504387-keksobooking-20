'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var mapFilterElements = document.querySelectorAll('.map__filters > *');

  var filterSelects = filterForm.querySelectorAll('select.map__filter');
  var filterCheckboxes = filterForm.querySelectorAll('input.map__checkbox');

  var loadedOffers = [];
  var filteredOffers = [];

  var filterByPrice = function (price, range) {
    var result;
    switch (range) {
      case 'low':
        result = price < 10000;
        break;
      case 'middle':
        result = price >= 10000 && price <= 50000;
        break;
      case 'high':
        result = price > 50000;
        break;
    }
    return result;
  };

  var filterOffers = function () {
    filteredOffers = loadedOffers;

    filterSelects.forEach(function (select) {
      if (select.value === 'any') {
        return;
      }

      if (select.name === 'housing-price') {
        filteredOffers = filteredOffers.filter(function (item) {
          return filterByPrice(item.offer.price, select.value);
        });
      } else {
        filteredOffers = filteredOffers.filter(function (item) {
          var value = select.name.split('-')[1];
          return item.offer[value].toString() === select.value;
        });
      }
    });

    filterCheckboxes.forEach(function (checkbox) {
      if (!checkbox.checked) {
        return;
      }

      filteredOffers = filteredOffers.filter(function (item) {
        return item.offer.features.indexOf(checkbox.value) !== -1;
      });
    });

    return filteredOffers;
  };

  var onFilterFormChange = function (evt) {
    window.map.updatePins(filterOffers(evt));
  };

  var init = function (offers) {
    loadedOffers = offers;

    window.util.enableFormElements(mapFilterElements);
    filterForm.addEventListener('change', onFilterFormChange);
    window.map.updatePins(filterOffers());
  };

  var destroy = function () {
    window.util.disableFormElements(mapFilterElements);
    filterForm.reset();
    filterForm.removeEventListener('change', onFilterFormChange);
  };

  window.filterForm = {
    init: init,
    destroy: destroy
  };
})();
