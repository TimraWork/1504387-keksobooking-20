'use strict';

(function () {
  var STATUS_CODE_SUCCESS = 200;
  var TIMEOUT = 10000;
  var Url = {
    LOAD: 'https://javascript.pages.academy/keksobooking/data',
    SAVE: 'https://javascript.pages.academy/keksobooking'
  };

  var ajax = function (params) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.onload = function () {
      if (xhr.status === STATUS_CODE_SUCCESS) {
        params.onLoad(xhr.response);
      } else {
        params.onError('Данные не загружены. Код ошибки: ' + xhr.status);
      }
    };

    xhr.onerror = function () {
      params.onError('Ошибка соединения');
    };

    xhr.timeout = TIMEOUT;
    xhr.ontimeout = function () {
      params.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    };

    xhr.open(params.method, params.url);

    if (params.data) {
      xhr.send(params.data);
    } else {
      xhr.send();
    }
  };

  var load = function (onLoad, onError) {
    ajax({
      url: Url.LOAD,
      method: 'GET',
      onLoad: onLoad,
      onError: onError
    });
  };

  var save = function (data, onLoad, onError) {
    ajax({
      url: Url.SAVE,
      method: 'POST',
      data: data,
      onLoad: onLoad,
      onError: onError
    });
  };

  window.backend = {
    load: load,
    save: save
  };
})();
