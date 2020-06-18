'use strict';
(function () {
  var getRandomItemFromArray = function (array) {
    return array[Math.floor(Math.random() * (array.length))];
  };

  var getRandomItemFromRange = function (range) {
    return Math.floor(range[0] + Math.random() * (range[1] - range[0] + 1));
  };

  var getArrayRandomLength = function (array) {
    return array.slice(0, Math.random() * (array.length + 1));
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

  var disableFormElements = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].setAttribute('disabled', 'true');
    }
  };

  var enableFormElements = function (element) {
    for (var i = 0; i < element.length; i++) {
      element[i].removeAttribute('disabled');
    }
  };

  window.util = {
    getRandomItemFromArray: getRandomItemFromArray,
    getRandomItemFromRange: getRandomItemFromRange,
    getArrayRandomLength: getArrayRandomLength,
    getClosestElement: getClosestElement,
    disableFormElements: disableFormElements,
    enableFormElements: enableFormElements
  };
})();
