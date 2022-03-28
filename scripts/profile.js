//   -= Окно изменений =-
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('#profile-close');
let overlay = document.querySelector('#profile-overlay');
//   -= инпуты =-
let inputName = document.querySelector('#input-name');
let inputSubname = document.querySelector('#input-subname');
let popupForm = document.querySelector('#profile-form');
//   -= имя профиля =-
let profileName = document.querySelector('.profile__name');
let profileSubname = document.querySelector('.profile__subname');

// -= функции открытия закрытия =-
function openPopup () {
  inputName.value = profileName.textContent;
  inputSubname.value = profileSubname.textContent;
  overlay.classList.add('popup_opened');
}
function closePopup () {
  overlay.classList.remove('popup_opened');
}
function formSubmitHandler (event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileSubname.textContent = inputSubname.value;
  closePopup();
}


//  
popupForm.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);