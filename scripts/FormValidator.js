class FormValidator {
  constructor(config, formSelector) {
    this._formSelector = formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
  }

  enableValidation() {
    this._setEventListeners(this._formSelector);
  }

  _setEventListeners(form) {
    this.buttonElement = form.querySelector(this._submitButtonSelector);
    const inputList = Array.from(form.querySelectorAll(this._inputSelector)); 
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(form, inputElement);
        this._toggleButtonState(inputList);
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

   _toggleButtonState (inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.lockButtonState();
    } else {
      this._unlockButtonState();
    }
  };

  lockButtonState () {
    this.buttonElement.classList.add(this._inactiveButtonClass);
    this.buttonElement.setAttribute('disabled', true)
  }
  _unlockButtonState () {
    this.buttonElement.classList.remove(this._inactiveButtonClass );
    this.buttonElement.removeAttribute('disabled')
  } 

  _showInputError (formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideInputError (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
  };
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };
}

export { FormValidator }