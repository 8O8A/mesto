// отображение ошибки
const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // inputElement.classList.add('popup__input-error');
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('popup__input-error_active');
    errorElement.classList.add(config.errorClass);
};

//скрытие ошибки
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    // inputElement.classList.remove('popup__input-error');
    inputElement.classList.remove(config.inputErrorClass)
    // errorElement.classList.remove('popup__input-error_active');
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

// проверка на валидацию поля инпута
const checkInputValidity = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
      hideInputError(formElement, inputElement, config);
    }
  };

// Добавление обработчиков всем полям формы
const setEventListeners = (formElement, config) => {
    // const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));  // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));      // Находим все поля внутри формы, сделаем из них массив методом Array.from
    // const buttonElement = formElement.querySelector('.popup__save-button');
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);           // Вызовем toggleButtonState, чтобы кнопка была не активной при открытии формы
    inputList.forEach((inputElement) => {                          // Обойдём все элементы полученной коллекции
        inputElement.addEventListener('input', () => {             // каждому полю добавим обработчик события input
        checkInputValidity(formElement, inputElement, config);     // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        toggleButtonState(inputList, buttonElement, config);       // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
});
};

//находим на странице и обработываем все формы с классом form
const enableValidation = (config) => {
    // const formList = Array.from(document.querySelectorAll('.popup__form'));   // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    const formList = Array.from(document.querySelectorAll(config.formSelector)); // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    formList.forEach((formElement) => {                                          // Переберём полученную коллекцию
        formElement.addEventListener('submit', (evt) => {                        // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
            evt.preventDefault();
        });
        setEventListeners(formElement, config);
    });
};

//  Функция проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
//  Но она ничего не делает с самой кнопкой «Отправить».
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {                                // проходим по этому массиву методом some
      // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
      });
  };

// Функция отключает и включает кнопку
  const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList, config)) {                                // Если есть хотя бы один невалидный инпут
      // buttonElement.classList.add('popup__save-button_disabled');         // делаем кнопку неактивной
      buttonElement.classList.add(config.inactiveButtonClass);               // делаем кнопку неактивной
      buttonElement.disabled = true;
    } else {
      // buttonElement.classList.remove('popup__save-button_disabled');      // иначе делаем кнопку активной
      buttonElement.classList.remove(config.inactiveButtonClass);            // иначе делаем кнопку активной
      buttonElement.disabled = false;
    }
  };

// Config - объект, который передаем в enableValidation и в showInputError и другие функции валидации соответственно
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  });