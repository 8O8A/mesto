const overlayPopup = document.querySelector('.popup');

const closePopupButton = overlayPopup.querySelector('.popup__close-button');
const openEditButton = document.querySelector('.profile__edit-button'); //кнопка "Редактировать" профиль
const profileName = document.querySelector('.profile__title'); //имя пользователя в профиле
const profileAbout = document.querySelector('.profile__subtitle'); //род деятельности пользователя в профиле

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
function openPopup () {
    overlayPopup.classList.add('popup_opened');
}

//удаляем класс у popup'а
function closePopup () {
    overlayPopup.classList.remove('popup_opened');
}

//функция отправки данных из popup'a в профиль
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    closePopup ();
}

overlayPopup.addEventListener('submit', formSubmitHandler);


//открываем PopUp
openEditButton.addEventListener('click', () => {
    // formToggle();
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
    openPopup ();
})

// закрываем PopUp
closePopupButton.addEventListener('click', () => {
    // formToggle();
    closePopup ();
})