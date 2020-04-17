const buttonEdit = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup')
const buttonClose = document.querySelector('.form__close-button');
const name = document.querySelector('.profile__name');
const nameInput = document.querySelector('.form__text_type_name');
const job = document.querySelector('.profile__job');
const jobInput = document.querySelector('.form__text_type_job');
const formElement = document.querySelector('.form')

//Функция открытия попапа
function OpenPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

//Функция закрытия попапа
function ClosePopup() {
    popup.classList.remove('popup_opened');
    //удаление написанного пользователем текста
    nameInput.value = "";
    jobInput.value = "";
}

//Функция отображения данных из формы на странице
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    //переменные для текста, введенного пользователем
    nameInputValue = nameInput.value;
    jobInputValue = jobInput.value;
    //Замена имени и работы на странице
    name.textContent = nameInputValue;
    job.textContent =  jobInputValue;
    //Закрытие попапа
    popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', OpenPopup);
buttonClose.addEventListener('click', ClosePopup);
// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', formSubmitHandler);