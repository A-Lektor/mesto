import { cardSample, popupImage, popupImageTitle, popupPhoto, openPopup } from "./index.js";
export class Card {
    constructor(title, image) {
      this.title = title;
      this.image = image;
    }
  
    _getTemplate() {
      const cardElement = cardSample.querySelector('.element').cloneNode(true);
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__photo').src = this.image ;
      this._element.querySelector('.element__photo').alt = this.title;
      this._element.querySelector('.element__title').textContent = this.title;
      this._setEventListeners(this.title, this.image);
      return this._element;
    }
  
    _setEventListeners(title, image) {
      this._element.querySelector('.element__like').addEventListener('click', function (event) {
        event.target.classList.toggle('element__like_active'); });
      this._element.querySelector('.element__remove').addEventListener('click', function (event) {
        event.target.closest('.element').remove(); });
      this._element.querySelector('.element__photo').addEventListener('click', function (event) {
        popupImage.setAttribute('src', image);
        popupImage.setAttribute('alt', title);
        popupImageTitle.textContent = title;
        openPopup(popupPhoto);
      });
    } 
  }