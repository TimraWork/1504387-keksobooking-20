'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarInput = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var photoInput = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');

  var togglePhoto = function (preview, reader) {
    var placeholder = preview.querySelector('img');

    if (placeholder) {
      placeholder.style.opacity = reader ? '0' : '1';
    }

    if (reader) {
      preview.style = 'background-image: url(' + reader.result + '); background-size: cover; background-position: center center;';
    } else {
      preview.style = 'background-image: none;';
    }
  };

  var setPhoto = function (previewImg, reader) {
    togglePhoto(previewImg, reader);
  };

  var resetPhoto = function (previewImg) {
    togglePhoto(previewImg);
  };

  var handlePhoto = function (fileInput, preview) {
    var file = fileInput.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (extension) {
        return fileName.endsWith(extension);
      });

      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          setPhoto(preview, reader);
        });
        reader.readAsDataURL(file);
      } else {
        resetPhoto(preview);
        fileInput.value = '';
        window.utils.showErrorNotification('Загрузите изображение формата gif, jpg, jpeg или png');
      }
    } else {
      resetPhoto(preview);
    }
  };

  var onAvatarChange = function () {
    handlePhoto(avatarInput, avatarPreview);
  };

  var onPhotoChange = function () {
    handlePhoto(photoInput, photoPreview);
  };

  var init = function () {
    avatarInput.addEventListener('change', onAvatarChange);
    photoInput.addEventListener('change', onPhotoChange);
  };

  var destroy = function () {
    resetPhoto(avatarPreview);
    resetPhoto(photoPreview);
    avatarInput.removeEventListener('change', onAvatarChange);
    photoInput.removeEventListener('change', onPhotoChange);
  };

  window.adFormPhoto = {
    init: init,
    destroy: destroy
  };
})();
