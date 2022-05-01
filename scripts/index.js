/////////////////// переменные ///////////////////
/// кнопки открыть
const popupOpenElementButton = document.querySelector('.profile__add-button');
const popupOpenProfileButton = document.querySelector('.profile__edit-button');
/// кнопки закрыть
const popupCloseElementButton = document.querySelector('#element-close');
const popupCloseProfileButton = document.querySelector('#profile-close');
const popupClosePhotoButton = document.querySelector('#photo-close');
/// контейнеры форм
const popupCard = document.querySelector('#element-add');
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
const cardList = document.querySelector('.elements');
/// шблон карточки
const cardSample = document.querySelector('#element-sample').content;
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
  document.addEventListener('keydown', doSomething);
}

function doSomething(evt) {                                       //// закрыть попап по нажатию ESC
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopup(popup) {                         //// закрыть попап
  document.removeEventListener('keydown', doSomething);
  popup.classList.remove('popup_opened');
}

function handleProfileFormSubmit (event) {                        //// редактирование профиля
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubname.textContent = inputSubname.value;
  closePopup(popupProfile);
}

function createCard(imgUrl, imgName) {                            //// Добавленеие карточки на страницу
  const userElement = cardSample.querySelector('.element').cloneNode(true);
  const userElementPhoto = userElement.querySelector('.element__photo');
  userElementPhoto.src = imgUrl;
  userElementPhoto.alt = imgName;
  userElement.querySelector('.element__title').textContent = imgName;

  userElement.querySelector('.element__like').addEventListener('click', function (event) { //Вернул функционал с предыдущего спринта. 
    event.target.classList.toggle('element__like_active'); }); 
  userElement.querySelector('.element__remove').addEventListener('click', function (event) {
    event.target.closest('.element').remove(); });
  userElement.querySelector('.element__photo').addEventListener('click', function (event) {
    popupImage.setAttribute('src', imgUrl);
    popupImage.setAttribute('alt', imgName);
    popupImageTitle.textContent = imgName;
    openPopup(popupPhoto);
  });

  return userElement;
}

function handleCardFormSubmit (event) {                      //// редактирование карточки
  const formButton = event.target.querySelector('.popup__submit');
  event.preventDefault();
  cardList.prepend(createCard(inputUrl.value, inputTitle.value));
  inputUrl.value = "";
  inputTitle.value = "";
  formButton.classList.add(config.inactiveButtonClass);
  formButton.setAttribute('disabled', true)
  closePopup(popupCard);
}

initialElements.forEach(function (item) {                       //// перебор массива, добавление карточек
  cardList.prepend(createCard(item.link, item.name));
});

/////////////////// Обработчики событий ///////////////////
// откртие
popupOpenElementButton.addEventListener('click', () => openPopup(popupCard));
popupOpenProfileButton.addEventListener('click', () => { inputName.value = profileName.textContent; inputSubname.value = profileSubname.textContent; openPopup(popupProfile);});

// закрытие
popups.addEventListener('click', (evt)=> { if (evt.target.classList.contains('overlay')) { closePopup(evt.target) } });
popupCloseElementButton.addEventListener('click', () => { closePopup(popupCard); });
popupCloseProfileButton.addEventListener('click', () => { closePopup(popupProfile); });
popupClosePhotoButton.addEventListener('click', () => { closePopup(popupPhoto); });
// Отправка формы
popupFormElement.addEventListener('submit', handleCardFormSubmit);
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);