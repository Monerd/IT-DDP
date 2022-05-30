import { Balance } from "./balance";
import { regWithEmailAndPassword } from "./firebaseTools";
import { blockUnblockLogIn } from "./mainModule";

export function registrateUser() {
    const reg_form = document.getElementById('registration-form');
    const login = reg_form.querySelector('#login');
    const password = reg_form.querySelector('#password');
    const submit_button = reg_form.querySelector('#submit');

    if (localStorage.getItem('userID'))
        submit_button.disabled = true;

    reg_form.addEventListener('submit', (event) => {
        event.preventDefault();
        const valueLogin = login.value;
        const valuePassword = password.value;
        regWithEmailAndPassword(valueLogin, valuePassword)
            .then(Balance.create)
            .then(() => {
                window.history.pushState({}, "", '/review');
                blockUnblockLogIn();
                route();
            });;
    });
}