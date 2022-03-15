//   -= Окно изменений =-
let editOpenButton = document.querySelector(".edit-button");
let editCloseButton = document.querySelector(".popup__close");
let editScreen = document.querySelector(".overlay");
//   -= инпуты =-
let inputName = document.querySelector("#input-name");
let inputSubname = document.querySelector("#input-subname");
let inputSubmit = document.querySelector(".popup__submit");
//   -= имя профиля =-
let profileName = document.querySelector(".profile__name");
let profileSubname = document.querySelector(".profile__subname");


// -= функции открытия закрытия =-
function editOpen () {
  editScreen.classList.toggle("popup_opened");
  inputName.setAttribute.value = profileName.textContent;
  inputSubname.setAttribute.value = profileSubname.textContent;
}
function editClose () {
  editScreen.classList.toggle("popup_opened");
}

editOpenButton.addEventListener('click', editOpen);
editCloseButton.addEventListener('click', editClose);

// -=  =-
function render () {
  profileName.innerHTML = inputName.value;
  profileSubname.innerHTML = inputSubname.value;
}

inputSubmit.addEventListener('click', render);