/////////////////// переменные ///////////////////
import { initialElements } from "./initialElements.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
/// кнопки открыть
const popupOpenCardButton = document.querySelector('.profile__add-button');
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
const cardSample = document.querySelector('#element-sample');
/// информация о профиле
const profileName = document.querySelector('.profile__name');
const profileSubname = document.querySelector('.profile__subname');
/// попап раскрытой картинки
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__title_type_image');
// все попапы
const popups = document.querySelector('.popups');
// валидация
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_condition_disabled',
  inputErrorClass: 'popup__input_type_error',
}
const enableValidationElement = new FormValidator(config, popupFormElement);
const enableValidationProfile = new FormValidator(config, popupFormProfile);



/////////////////// Функции ///////////////////
  
  function openPopup(popup) {                                       //// открыть попап
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
  }
  function handleEscClose(evt) {                                       //// закрыть попап по нажатию ESC
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup);
    }
  }
  function closePopup(popup) {                         //// закрыть попап
    document.removeEventListener('keydown', handleEscClose);
    popup.classList.remove('popup_opened');
  }
  
  function handleProfileFormSubmit (event) {                        //// редактирование профиля
    event.preventDefault();
    profileName.textContent = inputName.value;
    profileSubname.textContent = inputSubname.value;
    closePopup(popupProfile);
  }
  function handleCardFormSubmit (event) {                      //// редактирование карточки
    const formButton = event.target.querySelector('.popup__submit');
    const card = new Card(inputTitle.value, inputUrl.value, cardSample);
    event.preventDefault();
    cardList.prepend(card.generateCard());
    inputUrl.value = "";
    inputTitle.value = "";
    enableValidationElement.lockButtonState();
    closePopup(popupCard);
  }
  
initialElements.forEach((item) => {
  const card = new Card(item.name, item.link, cardSample);
  const cardElement = card.generateCard();
  cardList.prepend(cardElement);
});

enableValidationElement.enableValidation();
enableValidationProfile.enableValidation();
/////////////////// Обработчики событий ///////////////////
// откртие
popupOpenCardButton.addEventListener("click", () => openPopup(popupCard));
popupOpenProfileButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputSubname.value = profileSubname.textContent;
  openPopup(popupProfile);
});
// закрытие
popups.addEventListener('click', (evt)=> { if (evt.target.classList.contains('overlay')) { closePopup(evt.target) } });
popupCloseElementButton.addEventListener('click', () => closePopup(popupCard) );
popupCloseProfileButton.addEventListener('click', () => closePopup(popupProfile) );
popupClosePhotoButton.addEventListener('click', () =>  closePopup(popupPhoto) );
// Отправка формы
popupFormElement.addEventListener('submit', handleCardFormSubmit);
popupFormProfile.addEventListener('submit', handleProfileFormSubmit);

export { popupImage, popupImageTitle, popupPhoto, config, openPopup }