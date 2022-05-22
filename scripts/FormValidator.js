const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_condition_disabled',
  inputErrorClass: 'popup__input_type_error',
}

class Validate {
  constructor(config) {
    this.formSelector = config.formSelector;
    this.inputSelector = config.inputSelector;
    this.submitButtonSelector = config.submitButtonSelector;
    this.inactiveButtonClass = config.inactiveButtonClass;
    this.inputErrorClass = config.inputErrorClass;
  }

  enableValidation() {
    const formList = document.querySelectorAll(this.formSelector);
    formList.forEach((form) => {
    this._setEventListeners(form)
  });
  }

  _setEventListeners(form) {
    const buttonElement = form.querySelector(this.submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(this.inputSelector));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(form, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

   _checkInputValidity (form, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(form, inputElement);
    }
  };

   _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true)
    } else {
      buttonElement.classList.remove(this.inactiveButtonClass );
      buttonElement.removeAttribute('disabled')
    }
  };

  _showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
  };
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
}

export { Validate, config }