// const overlayPopup = document.querySelector('.popup');

const popupTitle = document.querySelector('.popup_type-edit'); //popup Профиля
const popupAdd = document.querySelector('.popup_type-add');    //popup Добавления фотографии
const popupForm = document.querySelector('.popup__form');
const closePopupButton = document.querySelector('.popup__close-button');
const openEditButton = document.querySelector('.profile__edit-button'); //кнопка "Редактировать" профиль
const profileName = document.querySelector('.profile__title'); //имя пользователя в профиле
const profileAbout = document.querySelector('.profile__subtitle'); //род деятельности пользователя в профиле
const openAddButton = document.querySelector('.profile__add-button'); //кнопка "Добавить фотографию"
const popupName = document.querySelector('.popup__input-field_type_name'); //имя пользователя в popup'e
const popupAbout = document.querySelector('.popup__input-field_type_about'); //род деятельности пользователя в popup'e


//функция проверки есть ли у popup'a класс popup_opened
// function formToggle() {
//     if (!document.querySelector('.popup').classList.contains('popup_opened')) {
//         overlayPopup.classList.add('popup_opened');
//     } else {
//         overlayPopup.classList.remove('popup_opened');
//     }
// }

// // функция открытия и закрытия PopUp'a
// function formToggle() {
//     overlayPopup.classList.toggle('popup_opened');
// }


//добавляем класс к popup'y
function openPopup (popup) {
    popup.classList.add('popup_opened');
}

//удаляем класс у popup'а
function closePopup (popup) {
    popup.classList.remove('popup_opened');
}

//открываем PopUp профиля
openEditButton.addEventListener('click', () => {
    // formToggle();
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    openPopup (popupTitle);
})

//открываем popup добавления картинки
openAddButton.addEventListener('click', () => {
    openPopup(popupAdd);
})

// закрываем PopUp
closePopupButton.addEventListener('click', () => {
    // formToggle();
    closePopup (popupTitle);
})

//функция отправки данных из popup'a в профиль
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup (popupTitle);
}

popupForm.addEventListener('submit', formSubmitHandler);