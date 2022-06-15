import './pages/index.css';

import { 
  initialElements,
  popupOpenCardButton,
  popupOpenProfileButton,
  popupFormElement,
  popupFormProfile,
  inputName,
  inputSubname,
  inputTitle,
  inputUrl,
  config
} from "./utils/constants.js";



import { Card } from "./components/Card.js";
import { FormValidator } from "./components/FormValidator.js";

import { Section } from "./components/Section.js";

import { PopupWithForm } from "./components/PopupWithForm.js";
import { PopupWithImage } from "./components/PopupWithImage.js";

import { UserInfo } from "./components/UserInfo.js";

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