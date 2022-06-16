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
    cardRenderer.addItem(createNewCard(elementPopup._getInputValues().name, elementPopup._getInputValues().subname));
    enableValidationElement.lockButtonState();
    elementPopup.close();
    inputUrl.value = "";
    inputTitle.value = "";
  }
});
elementPopup.setEventListeners();

const profilePopup = new PopupWithForm({                   //POPUP PROFILE
  popupSelector: '#profile-edit',
  handleFormSubmit: () => {
    userInfo.setUserInfo(profilePopup._getInputValues().name, profilePopup._getInputValues().subname);
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

  const data = userInfo.getUserInfo();
  inputName.value = data.profileName;
  inputSubname.value = data.profileSubname;
  profilePopup.open()

});

