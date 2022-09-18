const overlayPopup = document.querySelector('.popup');

const popupTitle = document.querySelector('.popup_type-edit');
const popupAddPhoto = document.querySelector('.popup_type-add');

const closePopupButton = overlayPopup.querySelector('.popup__close-button');
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
const openCommonPopups = function openPopup () {
    overlayPopup.classList.add('popup_opened');
}

//удаляем класс у popup'а
const closeCommonPopups = function closePopup () {
    overlayPopup.classList.remove('popup_opened');
}

//функция отправки данных из popup'a в профиль
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closeCommonPopups (popupTitle);
}

overlayPopup.addEventListener('submit', formSubmitHandler);


//открываем PopUp
openEditButton.addEventListener('click', () => {
    // formToggle();
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    openCommonPopups (popupTitle);
    console.log(popupTitle);
})

// закрываем PopUp
closePopupButton.addEventListener('click', () => {
    // formToggle();
    closeCommonPopups (popupTitle);
})

//открываем popup добавления картинки
openAddButton.addEventListener('click', function() {
    openCommonPopups (popupAddPhoto);
    console.log(popupAddPhoto);
})
