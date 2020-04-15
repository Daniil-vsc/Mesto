let buttonEdit = document.querySelector('.button__edit');
let popup = document.querySelector('.popup')
let buttonClose = document.querySelector('.button__close');
let name = document.querySelector('.profile__name');
let nameInput = document.querySelector('.form__text_type_name');
let job = document.querySelector('.profile__job');
let jobInput = document.querySelector('.form__text_type_job');
let formElement = document.querySelector('.form')

//Функция открытия попапа
function OpenPopup() {
    popup.classList.add('popup_opened');
}
buttonEdit.addEventListener('click', OpenPopup);

//Подставление текста в поля попапа
function changePlaceholder(){
    nameInput.setAttribute('placeholder', name.textContent);
    jobInput.setAttribute('placeholder', job.textContent);
}
buttonEdit.addEventListener('click', changePlaceholder);

//Функция закрытия попапа
function ClosePopup() {
    popup.classList.remove('popup_opened');
    //удаление написанного пользователем текста
    nameInput.value = "";
    jobInput.value = "";
}
buttonClose.addEventListener('click', ClosePopup);

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

// Прикрепляем обработчик к форме:
formElement.addEventListener('submit', formSubmitHandler);
