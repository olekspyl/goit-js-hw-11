import axios from "axios"
import notiflix from "notiflix"

const refs = {
    formEl: document.querySelector('#search-form'),
    inputEl: document.querySelector('input'),
    submitEl: document.querySelector('button'),
}

 refs.submitEl.addEventListener('click', onBtnSubmitClick);
refs.inputEl.addEventListener('input', onInputChange);


let inform;



function onBtnSubmitClick() {
    fetch(`https://pixabay.com/api/?key=29655541-29ac0a319757ef7d347abf8a2&q=${inform}&image_type=photo`);
}

function onInputChange(e) {
    const inform = e.currentTarget.value;
}
