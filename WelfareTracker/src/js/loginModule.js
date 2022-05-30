import { getDatabase, ref, onValue, Unsubscribe } from "firebase/database";
import { Balance } from "./balance";
import { authWithEmailAndPassword } from "./firebaseTools";
import { blockUnblockLogIn } from "./mainModule";
import { Transaction } from "./transaction";

export function loginUser() {
    const reg_form = document.getElementById('login-form');
    const login = reg_form.querySelector('#login');
    const password = reg_form.querySelector('#password');
    const submit_button = reg_form.querySelector('#submit');

    if (localStorage.getItem('userID'))
        submit_button.disabled = true;

    reg_form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        authWithEmailAndPassword(login.value, password.value)
            .then(updateTransactionsInLocalStorage)
            .then(() => {
                window.history.pushState({}, "", '/review');
                blockUnblockLogIn();
                route();
            });
    });
}

function updateTransactionsInLocalStorage(uid) {
    if (!(typeof content === undefined)) {
        const db = getDatabase();
        const transactions = ref(db, "transactions");
        onValue(transactions, (t) => {
            const list = [];
            t.forEach((tChild) => {
                const child = tChild.val();
                if (child.idUser === uid) {
                    child.id = tChild.key;
                    list.push(child);
                }
            });
            localStorage.setItem(`transactions-${uid}`, JSON.stringify(list));
            Balance.update();
            if (window.location.pathname === '/transactions' || window.location.pathname === '/planned-transactions')
                Transaction.renderList();
        });
    }
}