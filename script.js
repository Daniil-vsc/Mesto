const popup = document.querySelector('.popup'); //общий класс
const editButton = document.querySelector('.profile__edit-button'); //кнопка ред. имени
const name = document.querySelector('.profile__name'); //имя, отображаемое на странице
const closeButton = document.querySelector('.popup__close-button'); //кнопка закрыть попап
const nameInput = document.querySelector('.popup__input_type_name');
const job = document.querySelector('.profile__job');
const jobInput = document.querySelector('.popup__input_type_job');
const formElement = document.querySelector('.popup__form');
const popupAddImage = document.getElementById('add-image'); //попап добавления карточки
const addButton = document.querySelector('.profile__add-button'); //кнопка добавить изображение
const closeButtonAddImage = document.getElementById('close-button');
const popupEditProfile = document.getElementById('edit-profile');
const placeNameInput = document.getElementById('place-input');
const placeLinkInput = document.getElementById('link-input');
const gridElements = document.querySelector('.elements'); //секция для карточек
const cardElement = document.querySelector('#element').content; //template карточки
const popupImage = document.getElementById('open-image'); 
const popupImageName = document.querySelector('.popup__name');
const closeButtonBigImage = document.getElementById('close-image');
const popupBigImage = document.querySelector('.popup__image');
const formPlace = document.getElementById('place-form');
const popupInput = Array.from(document.querySelectorAll('.popup__input'));
const spanError = Array.from(document.querySelectorAll('.popup__error'));

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

//удалем span у input
function deleteErrors() {
    spanError.forEach((span) => {
        span.textContent = '';
    })
    popupInput.forEach((input) => {
        input.classList.remove('popup__input_type_error');
    })
};

function openPopup(elem) {
    elem.classList.add('popup_opened');
    const popupOpened = document.querySelector('.popup_opened');
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popupOpened);
        };
    });
    document.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
        closePopup(popupOpened);
        }
    });
}

function closePopup(elem) {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          document.querySelector('.popup_opened').classList.remove('popup_opened');
        };
    });
    document.removeEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
        closePopup(popupOpened);
        }
    });
}

function formPopupAddImage(elem) {
    if (!elem.classList.contains('popup_opened')) {
    placeNameInput.value = "";
    placeLinkInput.value = "";
    };
    openPopup(elem)
    deleteErrors()
};

function formPopupEditProfile(elem) {
    if (!elem.classList.contains('popup_opened')) {
        nameInput.value = name.textContent;
        jobInput.value = job.textContent;
    };
    openPopup(elem)
    deleteErrors()
};

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
    closePopup(popup)
}

//функция лайк
function likeCard(evt) {
    evt.target.classList.toggle('element__like-button_type_active');
}

//функция открытия большого изображения
function bigImage(evt) {
    popupBigImage.src = evt.target.src;
    popupImageName.textContent = evt.target.alt;
    popupBigImage.alt = evt.target.alt;
    openPopup(popupImage);
}

//функция удаления карточки
function deleteCard(evt) {
    const cardBody = evt.target.closest('.element');
    const likeButton = cardBody.querySelector('.element__like-button'); //кнопка лайка
    const trashButton = cardBody.querySelector('.element__trash-button'); //кнопка корзины
    const cardTemplate = cardElement.cloneNode(true);
    const cardImage = cardTemplate.querySelector('.element__image'); //Изображение места
    cardImage.removeEventListener('click', bigImage);
    likeButton.removeEventListener('click', likeCard);
    trashButton.removeEventListener('click', deleteCard);
    cardBody.remove();
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
    cardImage.addEventListener('click', bigImage);
    return cardTemplate;
}

//Функция добавления новой карточки
function addNewCard(evt) {
    evt.preventDefault();
    gridElements.prepend(newCard(placeNameInput.value, placeLinkInput.value));
    closePopup(popupAddImage)
}

//Вывод массива в DOM
function renderCardFromArray() {
 initialCards.forEach(({name, link}) => gridElements.prepend(newCard(name,link)));
}

editButton.addEventListener('click', () => formPopupEditProfile(popupEditProfile));
closeButton.addEventListener('click', () => closePopup(popupEditProfile));
addButton.addEventListener('click', () => formPopupAddImage(popupAddImage));
closeButtonAddImage.addEventListener('click', () => closePopup(popupAddImage));
formElement.addEventListener('submit', formSubmitHandler);
formPlace.addEventListener('submit', addNewCard);
closeButtonBigImage.addEventListener('click', () => closePopup(popupImage));

renderCardFromArray()