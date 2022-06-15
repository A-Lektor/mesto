import { Popup } from './Popup.js';
class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector('.popup__image');
    this._title = this._popupElement.querySelector('.popup__title_type_image');
  }

  open(data) {
    super.open();
    this._image.src = data.image;
    this._title.textContent = data.title;
    this._image.alt = data.title;
  }
}
export { PopupWithImage }