const popup = document.querySelector('.popup'); //общий класс
const editButton = document.querySelector('.profile__edit-button'); //кнопка ред. имени
const name = document.querySelector('.profile__name'); //имя, отображаемое на странице
const closeButton = document.querySelector('.popup__close-button'); //кнопка закрыть попап
const nameInput = document.querySelector('.form__text_type_name');
const job = document.querySelector('.profile__job');
const jobInput = document.querySelector('.form__text_type_job');
const formElement = document.querySelector('.form');
const popupAddImage = document.getElementById('add-image'); //попап добавления карточки
const addButton = document.querySelector('.profile__add-button'); //кнопка добавить изображение
const closeButtonAddImage = document.getElementById('close-button');
const popupEditProfile = document.getElementById('edit-profile');
const placeNameInput = document.getElementById('place-name');
const placeLinkInput = document.getElementById('place-link');
const gridElements = document.querySelector('.elements'); //секция для карточек
const cardElement = document.querySelector('#element').content; //template карточки
const popupImage = document.getElementById('open-image'); 
const popupImageName = document.querySelector('.popup__name');
const closeButtonBigImage = document.getElementById('close-image');
const popupBigImage = document.querySelector('.popup__image');
const formPlace = document.getElementById('place-form');

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
    },
];

//Функция отображения данных из формы на странице
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    //переменные для текста, введенного пользователем
    const nameInputValue = nameInput.value;
    const jobInputValue = jobInput.value;
    //Замена имени и работы на странице
    name.textContent = nameInputValue;
    job.textContent =  jobInputValue;
    //Закрытие попапа
    getPopup(popup)
}

//Функия открытия и закрытия для всех попапов
function getPopup(elem) {
    if (!elem.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
        placeNameInput.value = "";
        placeLinkInput.value = "";
    }
    elem.classList.toggle('popup_opened');
};

//Функция добавления новой карточки
function addNewCard(evt) {
    evt.preventDefault();
    gridElements.prepend(newCard(placeNameInput.value, placeLinkInput.value));
    getPopup(popupAddImage)
}

//функция удаления карточки
function deleteCard(evt) {
    const likeButton = document.querySelector('.element__like-button'); //кнопка лайка
    likeButton.removeEventListener('click', likeCard);
    const trashButton = document.querySelector('.element__trash-button'); //кнопка корзины
    trashButton.removeEventListener('click', deleteCard);

    evt.target.closest('.element').remove();
}

//функция лайк
function likeCard(evt) {
    evt.target.classList.toggle('element__like-button_type_active');
}

//функция открытия большого изображения
function BigImage(evt) {
    popupBigImage.src = evt.target.src;
    const singleCard = evt.target.closest('.element');
    const cardName = singleCard.querySelector('.element__name');
    popupImageName.textContent = cardName.textContent;
    getPopup(popupImage);
}

//Отображение шаблона
function newCard(name, image) {
    const cardTemplate = cardElement.cloneNode(true);
    const cardName = cardTemplate.querySelector('.element__name'); //Название места
    const cardImage = cardTemplate.querySelector('.element__image'); //Изображение места
    const trashButton = cardTemplate.querySelector('.element__trash-button'); //кнопка корзины
    const likeButton = cardTemplate.querySelector('.element__like-button'); //кнопка лайка
    cardName.textContent = name;
    cardImage.src = image;
    cardImage.alt = name;
    trashButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', likeCard);
    cardImage.addEventListener('click', BigImage);
    return cardTemplate;
}

//Вывод массива в DOM
function getCardFromArray() {
    initialCards.forEach(function (item) {
    gridElements.prepend(newCard(item.name, item.link));
    });
}

editButton.addEventListener('click', () => getPopup(popupEditProfile));
closeButton.addEventListener('click', () => getPopup(popupEditProfile));
addButton.addEventListener('click', () => getPopup(popupAddImage));
closeButtonAddImage.addEventListener('click', () => getPopup(popupAddImage));
formElement.addEventListener('submit', formSubmitHandler);
formPlace.addEventListener('submit', addNewCard);
closeButtonBigImage.addEventListener('click', () => getPopup(popupImage))

getCardFromArray()