export const initialElements = [
  {
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
  {
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
  {
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
  {
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
  {
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
  {
  name: 'Белка :)',
  link: 'https://i.pinimg.com/originals/07/89/f2/0789f27aa56a729edc08862f0f1af464.gif'}
];



/// кнопки открыть
export const popupOpenCardButton = document.querySelector('.profile__add-button');
export const popupOpenProfileButton = document.querySelector('.profile__edit-button');
/// сами формы
export const popupFormElement = document.querySelector('#element-form');
export const popupFormProfile = document.querySelector('#profile-form');
/// инпуты форм
export const inputName = document.querySelector('#input-name');
export const inputSubname = document.querySelector('#input-subname');
export const inputTitle = document.querySelector('#element-input-title');
export const inputUrl = document.querySelector('#element-input-url');
export const imagePopup = document.querySelector('#element-input-url');
// валидация
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_condition_disabled',
  inputErrorClass: 'popup__input_type_error',
}