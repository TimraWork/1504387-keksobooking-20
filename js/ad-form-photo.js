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

  var showError = function (error) {
    var node = document.createElement('div');
    node.style = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background:#ff5635; padding: 10px 50px; color: white; font-size: 20px; margin-bottom: 10px; border-radius: 5px;';
    node.textContent = error;
    document.body.insertAdjacentElement('afterEnd', node);
    setTimeout(function () {
      node.remove();
    }, 3000);
  };

  var adFormPhoto = function (fileInput, preview) {
    var file = fileInput.files[0];

    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      try {

        if (matches) {
          var reader = new FileReader();
          reader.onload = function () {
            setPhoto(preview, reader);
          };
          reader.readAsDataURL(file);
        } else {
          resetPhoto(preview);
          throw Error('Загрузите изображение формата gif, jpg, jpeg или png');
        }
      } catch (e) {
        fileInput.value = '';
        showError(e.message);
      }

    } else {
      resetPhoto(preview);
    }
  };

  var onAvatarChange = function () {
    adFormPhoto(avatarInput, avatarPreview);
  };

  var onPhotoChange = function () {
    adFormPhoto(photoInput, photoPreview);
  };

  window.adFormPhoto = {
    reset: function () {
      resetPhoto(avatarPreview);
      resetPhoto(photoPreview);
    },
    initHandlers: function () {
      avatarInput.addEventListener('change', onAvatarChange);
      photoInput.addEventListener('change', onPhotoChange);
    },
    destroyHandlers: function () {
      avatarInput.removeEventListener('change', onAvatarChange);
      photoInput.removeEventListener('change', onPhotoChange);
    }
  };
})();
