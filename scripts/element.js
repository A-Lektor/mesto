
//   -= Окно изменений =-
let popupElementOpenButton = document.querySelector('.profile__add-button');
let popupElementCloseButton = document.querySelector('#element-close');
let ElementOverlay = document.querySelector('#element-overlay');
//   -= инпуты =-
let inputTitle = document.querySelector('#element-input-title');
let inputUrl = document.querySelector('#element-input-url');
let popupFormElement = document.querySelector('#element-form');
let elementLike = document.querySelector('#element__like');
// popup картинки
const ImageOverlay = document.querySelector('#image-overlay');
const popupImageCloseButton = document.querySelector('#image-close');
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__title_type_image');
// -= грид =-
const elements = document.querySelector('.elements');
//   -= шаблон карточки =-
const elementSample = document.querySelector('#element-sample').content;
const userElement = elementSample.querySelector('.element').cloneNode(true);
// -= сохраненые карточки =-
const initialElements = [
    {name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'},
    {name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'},
    {name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'},
    {name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'},
    {name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'},
    {name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'}
  ];
// -= функции открытия закрытия =-
function openPopupElement () {
  ElementOverlay.classList.add('popup_opened');
}
function closePopupElement () {
  ElementOverlay.classList.remove('popup_opened');
}
function closePopupImage () {
  ImageOverlay.classList.remove('popup_opened');
}
// -= Добавление карточки =-
function elementFormSubmitHandler (event) {
  event.preventDefault();
  const userElement = elementSample.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__photo').src = inputUrl.value;
  userElement.querySelector('.element__photo').alt = inputTitle.value;
  userElement.querySelector('.element__title').textContent = inputTitle.value;
  elements.prepend(userElement);
  closePopupElement();
  inputTitle.value = '';
  inputUrl.value = '';
  
  // лайк [хотелось вынести это в отдельные функции, но увы, не выходит :(]
  userElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  // remove
  userElement.querySelector('.element__remove').addEventListener('click', function (evtrem) {
    const rem = evtrem.target.closest('.element').remove();
  });
  //imageFullScrinPopap
  userElement.querySelector('.element__photo').addEventListener('click', function (evtimg) {
    const openedImage = evtimg.target.closest('.element__photo').getAttribute('src');
    const openedTitle = evtimg.target.closest('.element').textContent;
    popupImage.setAttribute('src', openedImage);
    popupImageTitle.textContent = openedTitle;
    ImageOverlay.classList.add('popup_opened');
  });
  
}
// -= перебор массива, добаление элементов =-
initialElements.forEach(function (item) {
  const userElement = elementSample.querySelector('.element').cloneNode(true);
  userElement.querySelector('.element__photo').src = item.link;
  userElement.querySelector('.element__photo').alt = item.name;
  userElement.querySelector('.element__title').textContent = item.name;
  elements.append(userElement);

  // лайк
  userElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  // remove
  userElement.querySelector('.element__remove').addEventListener('click', function (evtrem) {
    evtrem.target.closest('.element').remove();
  });
  //imageFullScrinPopap
  userElement.querySelector('.element__photo').addEventListener('click', function (evtimg) {
    const openedImage = evtimg.target.closest('.element__photo').getAttribute('src');
    const openedTitle = evtimg.target.closest('.element').textContent;
    popupImage.setAttribute('src', openedImage);
    popupImageTitle.textContent = openedTitle;
    ImageOverlay.classList.add('popup_opened');
  });

});
// -= -= Тригеры =- =-
popupImageCloseButton.addEventListener('click', closePopupImage);
popupFormElement.addEventListener('submit', elementFormSubmitHandler);
popupElementOpenButton.addEventListener('click', openPopupElement);
popupElementCloseButton.addEventListener('click', closePopupElement);