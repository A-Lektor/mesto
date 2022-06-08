import { initialElements } from "./initialElements.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

import { Section } from "./Section.js";

import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";

import { UserInfo } from "./UserInfo.js";
/// кнопки открыть
const popupOpenCardButton = document.querySelector('.profile__add-button');
const popupOpenProfileButton = document.querySelector('.profile__edit-button');
/// сами формы
const popupFormElement = document.querySelector('#element-form');
const popupFormProfile = document.querySelector('#profile-form');
/// инпуты форм
const inputName = document.querySelector('#input-name');
const inputSubname = document.querySelector('#input-subname');
const inputTitle = document.querySelector('#element-input-title');
const inputUrl = document.querySelector('#element-input-url');
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

const cardRenderer = new Section({                          //RENDER
  renderer: (item) => {
    cardRenderer.addItem(createNewCard(item.name, item.link));
  }
},
'.elements');

const elementPopup = new PopupWithForm({                    //POPUP CARD
  popupSelector: '#element-add',
  handleFormSubmit: () => {
    cardRenderer.addItem(createNewCard(inputTitle.value, inputUrl.value));
    inputUrl.value = "";
    inputTitle.value = "";
    enableValidationElement.lockButtonState();
    elementPopup.close();
  }
});
elementPopup.setEventListeners();

const profilePopup = new PopupWithForm({                   //POPUP PROFILE
  popupSelector: '#profile-edit',
  handleFormSubmit: () => {
    userInfo.setUserInfo(inputName.value, inputSubname.value);
    profilePopup.close();
  }
});
profilePopup.setEventListeners();

const imagePopup = new PopupWithImage('#photo-opened');    //PROFILE IMAGE
imagePopup.setEventListeners();

const userInfo = new UserInfo({                     //PROFILER
  name: '.profile__name', 
  subname: '.profile__subname'
});

function createNewCard (name, link, handleCardClick) {
  return new Card(
    name,
    link,
    '#element-sample',
    (image, title) => {
      imagePopup.open({
        image: image,
        title: title
      });
    }).generateCard();
}
  
cardRenderer.renderItems(initialElements); //Dобавление карточек из массива

enableValidationElement.enableValidation();
enableValidationProfile.enableValidation();

popupOpenCardButton.addEventListener("click", () => elementPopup.open());
popupOpenProfileButton.addEventListener("click", () => {

  inputName.value = userInfo.getUserInfo().profileName;
  inputSubname.value = userInfo.getUserInfo().profileSubname;
  profilePopup.open()

});

export { config, imagePopup }