/////////////////// переменные ///////////////////
/// кнопки открыть
const popupOpenElementButton = document.querySelector('.profile__add-button');
const popupOpenProfileButton = document.querySelector('.profile__edit-button');
/// кнопки закрыть
const popupCloseElementButton = document.querySelector('#element-close');
const popupCloseProfileButton = document.querySelector('#profile-close');
const popupClosePhotoButton = document.querySelector('#photo-close');
/// контейнеры форм
const popupElement = document.querySelector('#element-add');
const popupProfile = document.querySelector('#profile-edit');
const popupPhoto = document.querySelector('#photo-opened');
/// сами формы
const popupFormElement = document.querySelector('#element-form');
const popupFormProfile = document.querySelector('#profile-form');
/// инпуты форм
const inputName = document.querySelector('#input-name');
const inputSubname = document.querySelector('#input-subname');
const inputTitle = document.querySelector('#element-input-title');
const inputUrl = document.querySelector('#element-input-url');
/// контейнер карточек
const elements = document.querySelector('.elements');
/// шблон карточки
const elementSample = document.querySelector('#element-sample').content;
/// информация о профиле
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
/// попап раскрытой картинки
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__title_type_image');
// все попапы
const popups = document.querySelector('.popups');


/////////////////// Функции ///////////////////
function openPopup(popup) {                                       //// открыть попап
  popup.classList.add('popup_opened');
}
function closePopup(popup) {                                       //// закрыть попап
  if (popup === popupElement || popup === popupProfile || popup === popupPhoto) {
   popup.classList.remove('popup_opened');
  } else if (popup.target.classList.contains('popup__close')) {
  popup.target.closest('.overlay').classList.remove('popup_opened');
 } else if (popup.target.classList.contains('overlay')) {
  popup.target.classList.remove('popup_opened');
 }
}

function handleProfileFormSubmit (event) {                        //// редактирование профиля
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubname.textContent = inputSubname.value;
  closePopup(popupProfile);
}

function createCard(imgUrl, imgName) {                            //// Добавленеие карточки на страницу
  const userElement = elementSample.querySelector('.element').cloneNode(true);
  const userElementPhoto = userElement.querySelector('.element__photo');
  userElementPhoto.src = imgUrl;
  userElementPhoto.alt = imgName;
  userElement.querySelector('.element__title').textContent = imgName;
  return userElement;
}

function cardActions (event) {
  if (event.target.classList.contains('element__like')) {
    event.target.classList.toggle('element__like_active');
  } else if (event.target.classList.contains('element__remove')) {
    event.target.closest('.element').remove();
  } else if (event.target.classList.contains('element__photo')) {
    popupImage.setAttribute('src', event.target.getAttribute('src'));
    popupImage.setAttribute('alt', event.target.closest('.element').querySelector('.element__title').textContent);
    popupImageTitle.textContent = event.target.closest('.element').querySelector('.element__title').textContent;
    openPopup(popupPhoto);
  }
}

function handleElementFormSubmit (event) {                      //// редактирование карточки
  event.preventDefault();
  elements.prepend(createCard(inputUrl.value, inputTitle.value));
  inputUrl.value = "";
  inputTitle.value = "";
  closePopup(popupElement);
}

initialElements.forEach(function (item) {                       //// перебор массива, добавление карточек
  elements.prepend(createCard(item.link, item.name));
});
/////////////////// Обработчики событий ///////////////////
// откртие
popupOpenElementButton.addEventListener('click', () => { openPopup(popupElement); });
popupOpenProfileButton.addEventListener('click', () => { inputName.value = profileName.textContent; inputSubname.value = profileSubname.textContent; openPopup(popupProfile);});
// закрытие
popups.addEventListener('click', closePopup);


document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopup(popupElement);
      closePopup(popupProfile);
      closePopup(popupPhoto);
    }
})
/*
popupCloseElementButton.addEventListener('click', () => { closePopup(popupElement); });
popupCloseProfileButton.addEventListener('click', () => { closePopup(popupProfile); });
popupClosePhotoButton.addEventListener('click', () => { closePopup(popupPhoto); });
*/
// Отправка формы
popupFormElement.addEventListener('submit', handleElementFormSubmit);
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);
// карточки: лайк/удалить/открыть
elements.addEventListener('click', () => { cardActions(event); });







