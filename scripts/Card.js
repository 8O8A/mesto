//класс Card, который создаёт карточку с текстом и ссылкой на изображение
export default class Card {
    constructor(data, template, openBigImagePopup) {
        this._name = data.name;
        this._link = data.link;
        this._template = template;
        this._openBigImagePopup = openBigImagePopup;
    }

    //метод _getTemplate получает разметку шаблона по определённому селектору
    //Задача метода _getTemplate — вернуть разметку карточки через return.
    //Для наполнения данными и размещения карточки на страницы мы используем метод создания карточки
    _getTemplate() {
        const galleryCard = document
            .querySelector(this._template)
            .content
            .querySelector('.gallery__card')
            .cloneNode(true);

        return galleryCard;
    }

    //метод createCard() подготовит карточку к публикации. Он добавит данные в разметку
    createCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector('.gallery__image');
        this._cardImage.src = this._link;
        this._element.querySelector('.gallery__title').textContent = this._name;
        this._cardImage.alt = this._name;
        this._likeButton = this._element.querySelector('.gallery__like-button');
        this._deleteButton = this._element.querySelector('.gallery__trash');
        this._setEventListeners(this._element);

        return this._element;
    }

    //метод _deleteCard() удаления карточки
    _deleteCard() {
        this._element.remove()
        this._element = null
    }

    //метод _cardLikeHandler() ставит лайк фотографии
    _cardLikeHandler() {
        this._likeButton.classList.toggle('gallery__like-button_active')
    }

    //устанавливаем слушатели нажатий на карточку
    _setEventListeners() {
        this._deleteButton.addEventListener('click', () => { //удаляем карточку
            this._deleteCard();
        });

        this._likeButton.addEventListener('click', () => { //ставим лайк
            this._cardLikeHandler()
        });

        this._cardImage.addEventListener('click', () => {   //открываем попап фотографии
            this._openBigImagePopup(this._name, this._link)
        });
    };

};