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

const galleryElements = document.querySelector('.gallery__elements');
const itemTemplate = document.querySelector('.gallery-template').content;

function render() {
    initialCards.forEach(renderItems);
}

//основная функция рендеринга
function renderItems(element) {
    const newGalleryCard = itemTemplate.cloneNode(true);
    newGalleryCard.querySelector('.gallery__image').src = element.link;
    newGalleryCard.querySelector('.gallery__title').textContent = element.name;
    galleryElements.prepend(newGalleryCard)
}
render()

// Ставим лайки фотографиям
const photoLike = document.querySelectorAll('.gallery__like-button');
photoLike.forEach(function (item) {
    item.addEventListener('click', function (like) {
        like.target.classList.toggle('gallery__like-button_active');
    });
});

// Ставим лайки фотографиям
// const photoLike = document.querySelectorAll('.gallery__like-button');
//     for (let i=0; i < photoLike.length; i = i + 1) {
//         photoLike[i].addEventListener('click', () => {
//             photoLike[i].classList.toggle('gallery__like-button_active');
//         });
//     }