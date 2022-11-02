export default class FormValidator {
    constructor(config, formSelector) {
        this._formSelector = formSelector //форма попапа
        this._inputSelector = config.inputSelector; //поле для ввода
        this._submitButtonSelector = config.submitButtonSelector //кнопка внутри попапа
        this._inactiveButtonClass = config.inactiveButtonClass //отключение кнопки внутри попапа
        this._inputErrorClass = config.inputErrorClass //поле вывода сообщения об ошибке
        this._errorClass = config.errorClass //текст ошибки
        this._inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector)); // Находим все поля для ввода внутри формы, сделаем из них массив методом Array.from
        this._errorList = Array.from(this._formSelector.querySelectorAll(this._inputErrorClass)); // Находим все поля вывода соббщения об ошибки внутри формы, сделаем из них массив методом Array.from
        this._buttonElement = this._formSelector.querySelector(this._submitButtonSelector); //
    }


    // отображение ошибки
    _showInputError(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.classList.add(this._errorClass);
        errorElement.textContent = inputElement.validationMessage;
    };

    //скрытие ошибки
    _hideInputError(inputElement) {
        const errorElement = this._formSelector.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = "";
    };

    // метод Проверка на валидацию поля инпута
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement);
        } else {
            this._hideInputError(inputElement);
        }
    };

    // метод проверяет наличие невалидного поля и сигнализирует, можно ли разблокировать кнопку сабмита.
    //но она ничего не делает с самой кнопкой «Отправить».
    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {     // проходим по этому массиву методом some
            // Если поле не валидно, колбэк вернёт true
            // Обход массива прекратится и метод
            // hasInvalidInput вернёт true
            return !inputElement.validity.valid;
        });
    };

    //блокируем кнопу формы добавления фотографии
    blockButton () {
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    }


    // метод отключает и включает кнопку
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.blockButton ()
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    // метод Добавление обработчиков всем полям формы
    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    };
   //сбрасываем ошибки полей
    resetValidation() {
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    };

    validationSettings = () => {
        this._setEventListeners();
    };
};