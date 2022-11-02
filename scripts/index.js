import Card from './Card.js'
import FormValidator from './FormValidator.js'

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

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input-field',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input-error',
    errorClass: 'popup__input-error_active'
};

//Окно "Редактировать профиль"
const profileTitleName = document.querySelector('.profile__title'); //имя пользователя в профиле
const profileTitleAbout = document.querySelector('.profile__subtitle'); //род деятельности пользователя в профиле
const profileButtonOpenEdit = document.querySelector('.profile__edit-button'); //кнопка открыть popup "Редактировать" профиль


//Окно "Добавления фотографии"
const popupAddPhoto = document.querySelector('.popup_type-add-photo'); //popup Добавления фотографии
const buttonAddPhoto = document.querySelector('.profile__add-button'); //кнопка "Добавить фотографию"
// const buttonSavePhoto = popupAddPhoto.querySelector('.add-photo') //кнопка "Создать" формы добавления фотографии

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
const imageBigFigcaption = popupImage.querySelector('.popup__image-title');

//кнопки (крестики) закрытия popup'ов
// const buttonCloseEdit = popupEditProfile.querySelector('.popup__close-button'); //закрыть popup  "Профиль"
// const buttonCloseAdd = popupAddPhoto.querySelector('.popup__close-button_add-photo'); //закрыть popup "Добавить фотографию"
// const buttonClosePhoto = popupImage.querySelector('.popup__close-button-image');//закрыть Popup с картинкой

//массив фотографий
const galleryElements = document.querySelector('.gallery__elements');


const profileEditValidation = new FormValidator(validationSettings, formEditProfile);
const cardAddEditValidation = new FormValidator(validationSettings, formAddPhoto);
profileEditValidation.validationSettings(); //проверка формы профиля
cardAddEditValidation.validationSettings(); //проверка формы добавления фотографии

//Функция открытия popup (добавляем класс открытия к popup'y)
const openPopup = function (popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape); //слушатель нажатия на Escape
    // document.addEventListener('mousedown', closeByClickOverlay);  //слушатель нажатия на оверлей
}

//Функция закрытия popup (удаляем класс открытия у popup'а)
const closePopup = function (popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape); // удаляем слушатель на нажатия Escape
    // document.removeEventListener('mousedown', closeByClickOverlay);  // удаляем слушатель нажатия на оверлей
}


///////////////**** функция закрытия попапа кнопкой Escape ****////////////////////
function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened'); //находим открытый в данный момент попап
        closePopup(openedPopup)   //закрываем открытый в данный момент попап
    }
}

// ///////////////**** функция закрытия попапа по клику на оверлей ****///////////////
// function closeByClickOverlay (evt) {
//     if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
//       closePopup(evt.target);
//     }
//   }




// //////очишаем форму добавления фотографии////////
const formPhoto = document.querySelector('.popup__form-photo');         //форма попапа добавления фотографии
//открываем popup добавления фотографии
buttonAddPhoto.addEventListener('click', () => {
    formPhoto.reset()                                          //очишаем форму добавления фотографии
    openPopup(popupAddPhoto);
    cardAddEditValidation.blockButton();   //блокируем кнопу формы добавления фотографии
    }
);



//функция отправки данных из popup'a в профиль
function profileFormSubmitHandler(evt) {
    evt.preventDefault();                                  //Эта строчка отменяет стандартную отправку формы.
    profileTitleName.textContent = popupTitleName.value;   // отправляем данные из popup в профиль
    profileTitleAbout.textContent = popupTitleAbout.value; // отправляем данные из popup в профиль
    closePopup(popupEditProfile);                          // и закрываем popup Профиля
}

//отменяем обновление страницы при отправке (submit) данных из формы popup'a Профиля
formEditProfile.addEventListener('submit', profileFormSubmitHandler);

//открываем popup Профиля с внесением данных из профиля в форму
profileButtonOpenEdit.addEventListener('click', () => {
    popupTitleName.value = profileTitleName.textContent;
    popupTitleAbout.value = profileTitleAbout.textContent;
    profileEditValidation.resetValidation();
    openPopup(popupEditProfile);
});


//открываем popup добавления фотографии
buttonAddPhoto.addEventListener('click', () => {
    cardAddEditValidation.resetValidation();
    openPopup(popupAddPhoto);
});

//Устанавливаем слушатель на каждый попап и созадём функцию закрытия попапа по клику на оверлей
const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});
///////эти функции больше не нужны///////
// //закрываем popup Профиля
// buttonCloseEdit.addEventListener('click', function () {
//     closePopup(popupEditProfile);
// })

// //закрываем popup добавления фотографии
// buttonCloseAdd.addEventListener('click', function () {
//     closePopup(popupAddPhoto);
// })

// //закрываем Popup с картинкой
// buttonClosePhoto.addEventListener('click', function () {
//     closePopup(popupImage)
// })


//Добавляем новую карточку (фотографию) в альбом +
function handleSubmit(evt) {
    evt.preventDefault()
    const addCard = {
        name: popupAddPhotoName.value,
        link: popupAddPhotoLink.value
    }
    const card = createCard(addCard)
    galleryElements.prepend(card)
    closePopup(popupAddPhoto);
}

//new --- Создание карточки через класс Card +
function createCard(item) {
    const newItem = new Card(item, '#gallery-template', openBigImagePopup)  // Создадим экземпляр карточки
    const newGalleryCard = newItem.createCard()
    return newGalleryCard
}

//new --- функция открытия попапа большой картинки +
function openBigImagePopup (name, link) {
    popupBigImage.src = link;
    popupBigImage.alt = name;
    imageBigFigcaption.textContent = name;
    openPopup(popupImage);
}

formAddPhoto.addEventListener('submit', handleSubmit);


//new ---Добавление фотографий из массива
initialCards.forEach((item) => {
    galleryElements.append(createCard(item));
});