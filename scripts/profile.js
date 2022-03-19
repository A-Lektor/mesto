//   -= Окно изменений =-
let popupOpenButton = document.querySelector('.edit-button');
let popupCloseButton = document.querySelector('.popup__close');
let overlay  = document.querySelector('.overlay');
//   -= инпуты =-
let inputName = document.querySelector('#input-name');
let inputSubname = document.querySelector('#input-subname');
let popupSubmit = document.querySelector('.popup__form');
//   -= имя профиля =-
let profileName = document.querySelector('.profile__name');
let profileSubname = document.querySelector('.profile__subname');


// -= функции открытия закрытия =-
function openPopup () {
  overlay .classList.add('popup_opened');
  inputName.setAttribute.value = profileName.textContent;
  inputSubname.setAttribute.value = profileSubname.textContent;
}
function closePopup () {
  overlay .classList.remove('popup_opened');
}
function formSubmitHandler () {
  profileName.innerHTML = inputName.value;
  profileSubname.innerHTML = inputSubname.value;
  closePopup();
}

// -=  =-
popupSubmit.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);