const overlayElement = document.querySelector('.overlay');

const closePopupButton = overlayElement.querySelector('.popup__close-button');
const openEditButton = document.querySelector('.profile__edit-button'); //кнопка "Редактировать" профиль
const profileName = document.querySelector('.profile__title'); //имя пользователя в профиле
const profileAbout = document.querySelector('.profile__subtitle'); //род деятельности пользователя в профиле

const popupName = document.getElementById('form-name'); //имя пользователя в popup'e
const popupAbout = document.getElementById('form-about'); //род деятельности пользователя в popup'e
const popupSaveButton = overlayElement.querySelector('.popup__save-button'); //кнопка "Сохранить" в popup'e


// функция открытия и закрытия PopUp'a
function formToggle() {
    overlayElement.classList.toggle('overlay_opened');
}

// открываем PopUp'a со значениями "Имя" и "О себе" из профиля
openEditButton.addEventListener('click', () => {
    popupName.value = profileName.innerText;
    popupAbout.value = profileAbout.innerText;
    formToggle();
});

// закрываем PopUp'a
closePopupButton.addEventListener('click', () => {
    formToggle();
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.innerText = popupName.value;
    profileAbout.innerText = popupAbout.value;
    popupName.value = profileName.innerText;
    popupAbout.value = profileAbout.innerText;
}

overlayElement.addEventListener('submit', formSubmitHandler);



// сохраняем изменения в popup и закрываем
popupSaveButton.addEventListener('click', () => {
    formToggle();
})

// Ставим лайки фотографиям
const photoLike = document.querySelectorAll('.gallery__like-button');
    for (let i=0; i < photoLike.length; i = i + 1) {
        photoLike[i].addEventListener('click', () => {
            photoLike[i].classList.toggle('gallery__like-button_active');
        });
    }