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
const showInputError = (formElement, inputElement, errorMessage, form) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(form.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(form.errorClass);
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, form) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(form.inputErrorClass);
  errorElement.classList.remove(form.errorClass);
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement, form) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, form);
  } else {
    hideInputError(formElement, inputElement, form);
  }
};

//Проверяем валидность форму
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })  
  };

//Функция активации кнопки
const toggleButtonState = (inputList, buttonElement, form) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add(form.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
    } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(form.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
    }
    };



//добавление слушателя всем полям формы
const setEventListeners = (formElement, form) => {
    const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
    const buttonElement = formElement.querySelector(form.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, form);
    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
    // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    toggleButtonState(inputList, buttonElement, form);
    isValid(formElement, inputElement, form)
    });
    });
};

//добавим слушателя ко всем формам
const enableValidation = (form) => {
    const formList = Array.from(document.querySelectorAll(form.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, form);
    });
  };
  
  // Вызовем функцию
  enableValidation(validationConfig);
