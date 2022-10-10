// отображение ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
};

//скрытие ошибки
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input-error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};

// проверка на валидацию поля инпута
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

// Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input-field'));  // Находим все поля внутри формы, сделаем из них массив методом Array.from
    const buttonElement = formElement.querySelector('.popup__save-button');
    toggleButtonState(inputList, buttonElement);           // Вызовем toggleButtonState, чтобы кнопка была не активной при открытии формы
    inputList.forEach((inputElement) => {                  // Обойдём все элементы полученной коллекции
        inputElement.addEventListener('input', () => {     // каждому полю добавим обработчик события input
        checkInputValidity(formElement, inputElement);     // Внутри колбэка вызовем isValid, передав ей форму и проверяемый элемент
        toggleButtonState(inputList, buttonElement);       // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
});
};

//находим на странице и обработываем все формы с классом form
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));  // Найдём все формы с указанным классом в DOM, сделаем из них массив методом Array.from
    formList.forEach((formElement) => {                                      // Переберём полученную коллекцию
        formElement.addEventListener('submit', (evt) => {                    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
            evt.preventDefault();
        });
        setEventListeners(formElement);
    });
};

//  Функция проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
//  Но она ничего не делает с самой кнопкой «Отправить».
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {       // проходим по этому массиву методом some
      // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
      });
  };

// Функция отключает и включает кнопку
  const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {                                // Если есть хотя бы один невалидный инпут
      buttonElement.classList.add('popup__save-button_disabled');    // делаем кнопку неактивной
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove('popup__save-button_disabled'); // иначе делаем кнопку активной
      buttonElement.disabled = false;
    }
  };

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
  });