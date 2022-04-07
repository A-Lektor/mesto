
// Кнопки откртывающие попапы
const popupOpenElementButton = document.querySelector('.profile__add-button');
const popupOpenProfileButton = document.querySelector('.profile__edit-button');
// Кнопки закрывыющие попапы
const popupCloseElementButton = document.querySelector('#element-close');
const popupCloseProfileButton = document.querySelector('#profile-close');
const popupClosePhotoButton = document.querySelector('#image-overlay');
// Форма добавляющая карточки
const popupElementOpenButton = document.querySelector('.profile__add-button');
const popupElementCloseButton = document.querySelector('#element-close');
const ElementOverlay = document.querySelector('#element-overlay');
const inputTitle = document.querySelector('#element-input-title');
const inputUrl = document.querySelector('#element-input-url');
const popupFormElement = document.querySelector('#element-form');
// Форма редактирования профиля
const popupFormProfile = document.querySelector('#profile-form');
const inputName = document.querySelector('#input-name');
const inputSubname = document.querySelector('#input-subname');
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
// попап раскрытой карточки
const ImageOverlay = document.querySelector('#image-overlay');
const popupImageCloseButton = document.querySelector('#image-close');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__title_type_image');
// контейнер карточек
const elements = document.querySelector('.elements');
// шблон карточки
const elementSample = document.querySelector('#element-sample').content;




/////////////////// Функция редактирования профиля ///////////////////
function handleProfileFormSubmit (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubname.textContent = inputSubname.value;
  closePopup(popupCloseProfileButton);
}

/////////////////// Функции открытия\закрытия попапов ///////////////////
function openPopup(popup) {
  let evtButton = popup.target.getAttribute('class').split(' ').pop();
  document.querySelector('#'+evtButton).classList.add('popup_opened');
}
function closePopup(popup) {
  /* Вероятнее всего, жто можно было сделать по другому... 
  Но try...catch тут необходим, тк в некоторых случаях в фунццию передается событие обработчика,
  а некоторых просто переменная в которую записан элемент, я пытался сделать это через оператор "ИЛИ", но не вышло :( */

  //let evtButton = popup.target.getAttribute('class').split(' ').pop() || popup.getAttribute('class').split(' ').pop();
  try {
    let evtButton = popup.target.getAttribute('class').split(' ').pop();
    document.querySelector(`#${evtButton}`).classList.remove('popup_opened');
  } catch {
    let evtButton = popup.getAttribute('class').split(' ').pop();
    document.querySelector(`#${evtButton}`).classList.remove('popup_opened');
  }
}

/////////////////// Функция добавляющаяя карточки ///////////////////
function userElementCreate(imgUrl, imgName) {
const userElement = elementSample.querySelector('.element').cloneNode(true);
const userElementPhoto = userElement.querySelector('.element__photo');
userElementPhoto.src = imgUrl;
userElementPhoto.alt = imgName;
userElement.querySelector('.element__title').textContent = imgName;
// обработчик лайка лайк
userElement.querySelector('.element__like').addEventListener('click', function (evt) {
  evt.target.classList.toggle('element__like_active');
});
// обработчИК УДАЛЕНИЯ 
userElement.querySelector('.element__remove').addEventListener('click', function (evt) {
  evt.target.closest('.element').remove();
}); 
//обработчик "раскрытия карточки"
userElement.querySelector('.element__photo').addEventListener('click', function (evtimg) {
  const openedImage = evtimg.target.closest('.element__photo').getAttribute('src');
  const openedTitle = evtimg.target.closest('.element').textContent;
  popupImage.setAttribute('src', openedImage);
  popupImage.setAttribute('alt', openedTitle);
  popupImageTitle.textContent = openedTitle;
  ImageOverlay.classList.add('popup_opened');
});
return userElement;
}

/////////////////// Добавление карточек пользователем ///////////////////
function handleElementFormSubmit (event) {
  event.preventDefault();
  elements.prepend(userElementCreate(inputUrl.value, inputTitle.value));
  inputUrl.value = "";
  inputTitle.value = "";
  closePopup(popupCloseElementButton);
}

/////////////////// перебор масива, вывод карточек ///////////////////
initialElements.forEach(function (item) {
  elements.prepend(userElementCreate(item.link, item.name));
});



/////////////////// Обработчики событий ///////////////////
// откртие
popupOpenElementButton.addEventListener('click', openPopup);
popupOpenProfileButton.addEventListener('click', openPopup);
// закрытие
popupCloseElementButton.addEventListener('click', closePopup);
popupCloseProfileButton.addEventListener('click', closePopup);
popupClosePhotoButton.addEventListener('click', closePopup);
// Отправка формы
popupFormElement.addEventListener('submit', handleElementFormSubmit); // Карточки 
popupFormProfile.addEventListener('submit', handleProfileFormSubmit); // Профиль