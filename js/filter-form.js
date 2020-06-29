'use strict';
(function () {
  var filterForm = document.querySelector('.map__filters');
  var mapFilterElements = document.querySelectorAll('.map__filters > *');
  var houseTypeSelect = document.querySelector('#housing-type');

  var loadedOffers;

  var filterOffers = function () {
    var type = houseTypeSelect.value;
    if (type !== 'any') {
      var filteredOffers = loadedOffers.filter(function (offer) {
        return offer.offer.type === type;
      });
      return filteredOffers;
    }
    return loadedOffers;
  };

  var onHouseTypeChange = function () {
    window.map.updatePins(filterOffers());
  };

  var init = function (offers) {
    loadedOffers = offers;
    window.util.enableFormElements(mapFilterElements);
    houseTypeSelect.addEventListener('change', onHouseTypeChange);
    window.map.updatePins(filterOffers());
  };

  var destroy = function () {
    window.util.disableFormElements(mapFilterElements);
    filterForm.reset();
    houseTypeSelect.removeEventListener('change', onHouseTypeChange);
  };

  window.filterForm = {
    init: init,
    destroy: destroy
  };
})();
