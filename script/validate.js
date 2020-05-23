//Элементы для проверки
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(formObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formObject.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, formObject) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(formObject.inputErrorClass);
  errorElement.classList.remove(formObject.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, formObject) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formObject);
  } else {
    hideInputError(formElement, inputElement, formObject);
  }
};

//Проверяем валидность форму
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })  
  };

//Функция активации кнопки
const toggleButtonState = (inputList, buttonElement, formObject) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(formObject.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
    } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(formObject.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
    }
    };



//добавление слушателя всем полям формы
const setEventListeners = (formElement, formObject) => {
    const inputList = Array.from(formElement.querySelectorAll(formObject.inputSelector));
    const buttonElement = formElement.querySelector(formObject.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, formObject);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    toggleButtonState(inputList, buttonElement, formObject);
    isValid(formElement, inputElement, formObject)
    });
    });
};

//добавим слушателя ко всем формам
const enableValidation = (formObject) => {
    const formList = Array.from(document.querySelectorAll(formObject.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, formObject);
    });
  };
  
  // Вызовем функцию
  enableValidation(validationConfig);
