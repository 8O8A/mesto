//Окно "Редактировать профиль"
const profileTitleName = document.querySelector('.profile__title'); //имя пользователя в профиле
const profileTitleAbout = document.querySelector('.profile__subtitle'); //род деятельности пользователя в профиле
const profileButtonOpenEdit = document.querySelector('.profile__edit-button'); //кнопка открыть popup "Редактировать" профиль


//Окно "Добавления фотографии"
const popupAddPhoto = document.querySelector('.popup_type-add-photo'); //popup Добавления фотографии
const buttonAddPhoto = document.querySelector('.profile__add-button'); //кнопка "Добавить фотографию"
const buttonSavePhoto = popupAddPhoto.querySelector('.add-photo') //кнопка "Создать"

//Форма popup'a Профиля
const popupEditProfile = document.querySelector('.popup_type-edit-profile'); //popup Профиля
const formEditProfile = popupEditProfile.querySelector('.popup__container');
const popupTitleName = formEditProfile.querySelector('.popup__input-field_type_name'); //имя пользователя в popup'e
const popupTitleAbout = formEditProfile.querySelector('.popup__input-field_type_about'); //род деятельности пользователя в popup'e

//Форма popup'a Добавление фотографии
const formAddPhoto = popupAddPhoto.querySelector('.popup__container');
const popupAddPhotoName = formAddPhoto.querySelector('.popup__input-field_type_card-name');
const popupAddPhotoLink = formAddPhoto.querySelector('.popup__input-field_type_card-link');

//popup просмотра фотографии
const popupImage = document.querySelector('.popup_type_image');
const popupBigImage = popupImage.querySelector('.popup__image');
const bigImageFigcaption = popupImage.querySelector('.popup__image-title');

//кнопки (крестики) закрытия popup'ов
const buttonCloseEdit = popupEditProfile.querySelector('.popup__close-button'); //закрыть popup  "Профиль"
const buttonCloseAdd = popupAddPhoto.querySelector('.popup__close-button_add-photo'); //закрыть popup "Добавить фотографию"
const buttonClosePhoto = popupImage.querySelector('.popup__close-button-image');//закрыть Popup с картинкой

//массив фотографий
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const galleryElements = document.querySelector('.gallery__elements'); //массив фотографий
const imageTemplate = document.querySelector('.gallery-template').content; //шаблон карточки


//Функция открытия popup (добавляем класс открытия к popup'y)
const openPopup = function(popup) {
    popup.classList.add('popup_opened');
}

//Функция закрытия popup (удаляем класс открытия у popup'а)
const closePopup = function(popup) {
    popup.classList.remove('popup_opened');
}


//функция отправки данных из popup'a в профиль
function formSubmitHandler(evt) {
    evt.preventDefault();                                  //Эта строчка отменяет стандартную отправку формы.
    profileTitleName.textContent = popupTitleName.value;   // отправляем данные из popup в профиль
    profileTitleAbout.textContent = popupTitleAbout.value; // отправляем данные из popup в профиль
    closePopup(popupEditProfile);                          // и закрываем popup Профиля
}

//отменяем обновление страницы при отправке (submit) данных из формы popup'a Профиля
formEditProfile.addEventListener('submit', formSubmitHandler);

//открываем popup Профиля с внесением данных из профиля в форму
profileButtonOpenEdit.addEventListener('click', () => {
    popupTitleName.value = profileTitleName.textContent;
    popupTitleAbout.value = profileTitleAbout.textContent;
    openPopup(popupEditProfile);
});

//открываем popup добавления фотографии
buttonAddPhoto.addEventListener('click', () => {
    popupAddPhotoName.value = '';  //очищаем поле ввода Название
    popupAddPhotoLink.value = '';  //очищаем поле ввода Ссылка на картинку
    popupAddPhotoName.placeholder = 'Название';
    popupAddPhotoLink.placeholder = 'Ссылка на картинку';
    openPopup(popupAddPhoto);
    });

//закрываем popup Профиля
buttonCloseEdit.addEventListener('click', function() {
    closePopup(popupEditProfile);
})

//закрываем popup добавления фотографии
buttonCloseAdd.addEventListener('click', function() {
    closePopup(popupAddPhoto);
})

//закрываем Popup с картинкой
buttonClosePhoto.addEventListener('click', function() {
    closePopup(popupImage)
})


//функция создания карточки
function renderItems(cardImage) {
    const newGalleryCard = imageTemplate.querySelector('.gallery__card').cloneNode(true);
    const galleryImage = newGalleryCard.querySelector('.gallery__image');
    galleryImage.src = cardImage.link;
    newGalleryCard.querySelector('.gallery__title').textContent = cardImage.name;
    galleryImage.alt = cardImage.name;
    galleryImage.addEventListener('click', function () {  //открываем просмотр фотографии при клике на неё
        openBigImage(newGalleryCard)
    });
    setButtonListener(newGalleryCard);
    return newGalleryCard; //card

}

//открываем Popup с картинкой
function openBigImage(newGalleryCard) {
    const bigImage = newGalleryCard.querySelector('.gallery__image');
    popupBigImage.src = bigImage.src;
    const bigImageTitle = newGalleryCard.querySelector('.gallery__title');
    popupBigImage.alt = bigImage.alt
    bigImageFigcaption.textContent = bigImageTitle.textContent;
    openPopup(popupImage)
}


//вставляем новую фотографию в начало альбома
const renderCard = (newGalleryCard) => {
    galleryElements.prepend(renderItems(newGalleryCard))
}

//Добавляем новую карточку (фотографию) в альбом
function handleSubmit(evt) {
    evt.preventDefault()
    const item = {
        name: popupAddPhotoName.value,
        link: popupAddPhotoLink.value
    }
    renderCard(item);
    closePopup(popupAddPhoto);
}

formAddPhoto.addEventListener('submit', handleSubmit);


//Добавление фотографий из массива
initialCards.reverse().forEach((newGalleryCard) => {
    renderCard(newGalleryCard);
})

//проверяем нажатие кнопок на карточке
function setButtonListener(newGalleryCard) {
    //кнопка лайка
    const buttonLike = newGalleryCard.querySelector('.gallery__like-button');
    buttonLike.addEventListener('click', likeButton);
    //кнопка удаления (корзина)
    const buttonDelete = newGalleryCard.querySelector('.gallery__trash');
    buttonDelete.addEventListener('click', deleteCard);
}

//функция для установки лайка фотографии
function likeButton(evt) {
    const like = evt.target.closest('.gallery__like-button');
    like.classList.toggle('gallery__like-button_active');
}

//функция удаления карточки с фотографией
function deleteCard(evt) {
    const buttonDeleteCard = evt.target.closest('.gallery__card');
    buttonDeleteCard.remove();
}