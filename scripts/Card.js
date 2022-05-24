import { popupImage, popupImageTitle, popupPhoto, openPopup } from "./index.js";
export class Card {
    constructor(title, image, template) {
      this._title = title;
      this._image = image;
      this._template = document.querySelector(template); //Сделал так, надеюсь правильно понял
    }
  
    _getTemplate() {
      const cardElement = this._template.content.querySelector('.element').cloneNode(true);
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.element__photo').src = this._image;
      this._element.querySelector('.element__photo').alt = this._title;
      this._element.querySelector('.element__title').textContent = this._title;
      this._setEventListeners();
      return this._element;
    }
  
    _setEventListeners() {
      this._element.querySelector('.element__like').addEventListener('click', function (event) {
        event.target.classList.toggle('element__like_active'); });
      this._element.querySelector('.element__remove').addEventListener('click', function (event) {
        event.target.closest('.element').remove(); });
      this._element.querySelector('.element__photo').addEventListener('click', () => {
        popupImage.setAttribute('src', this._image);
        popupImage.setAttribute('alt', this._title);
        popupImageTitle.textContent = this._title;
        openPopup(popupPhoto);
      });
    } 
  }