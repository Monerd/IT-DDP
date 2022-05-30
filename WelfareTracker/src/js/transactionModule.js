import { Transaction } from "./transaction";
import { isValidInTransaction } from "./utils";

export function addTransaction() {
    const transactionForm = document.getElementById('transaction-form');
    const dateInput = transactionForm.querySelector('#add-transaction-date');
    const titleInput = transactionForm.querySelector('#add-transaction-info-title');
    const commentInput = transactionForm.querySelector('#add-transaction-info-comment');
    const balanceInput = transactionForm.querySelector('#add-transaction-balance');
    const currencyInput = transactionForm.querySelector('#add-transaction-account');
    const submitButton = transactionForm.querySelector('#submit');
        
    transactionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        if (localStorage.getItem('userID')) {
            if (isValidInTransaction(titleInput.value) 
                && isValidInTransaction(currencyInput.value)
                && dateInput.value.length > 0) {
                
                const transaction = {
                    balance: balanceInput.value.trim(),
                    comment: commentInput.value.trim(),
                    currency: currencyInput.value.trim(),
                    date: dateInput.value.trim(),
                    idUser: localStorage.getItem('userID'),
                    title: titleInput.value.trim(),
                }
        
                submitButton.disabled = true;

                Transaction.create(transaction)
                    .then(() => {
                        dateInput.value = '';
                        titleInput.value = '';
                        commentInput.value = '';
                        balanceInput.value = '';
                        currencyInput.value = '';
                        submitButton.value = '';
            
                        submitButton.disabled = false;
                    })
                    .then(showTransactionForm());
            }
        }
        else alert('Вы ещё не авторизовались!');
    });
}

export function editTransaction(transactionID) {
    const list = JSON.parse(localStorage.getItem(`transactions-${localStorage.getItem('userID')}`));
    const transaction = list.find((t) => t.id === transactionID);

    const transactionDiv = document.getElementById(`${transaction.id}`);

    const date = new Date(transaction.date).toLocaleDateString().replaceAll('.', '-');
    const arrDate = date.split('-');
    const html = `<form id="edit-transaction-form" style="margin-top: 2vh;">
                    <input id="edit-transaction-date" type="date" value="${arrDate[2]}-${arrDate[1]}-${arrDate[0]}">
                    <label for="edit-transaction-info-title">Информация о месте</label>
                    <input id="edit-transaction-info-title" type="text" maxlength="20" value="${transaction.title}">
                    <label for="edit-transaction-info-comment">Комментарий</label>
                    <input id="edit-transaction-info-comment" type="text" maxlength="40" value="${transaction.comment}">
                    <label for="edit-transaction-balance">Сумма</label>
                    <input id="edit-transaction-balance" type="number" maxlength="15" value="${transaction.balance}">
                    <label for="edit-transaction-account">Способ оплаты</label>
                    <input id="edit-transaction-account" type="text" maxlength="10" value="${transaction.currency}">
                    <button type="submit-edit" id="submit">Обновить</button>
                </form>`;
    transactionDiv.innerHTML += html;

    const editTransactionForm = document.getElementById('edit-transaction-form');
    const dateInput = editTransactionForm.querySelector('#edit-transaction-date');
    const titleInput = editTransactionForm.querySelector('#edit-transaction-info-title');
    const commentInput = editTransactionForm.querySelector('#edit-transaction-info-comment');
    const balanceInput = editTransactionForm.querySelector('#edit-transaction-balance');
    const currencyInput = editTransactionForm.querySelector('#edit-transaction-account');
    const submitButton = editTransactionForm.querySelector('#submit-edit');

    editTransactionForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (isValidInTransaction(titleInput.value) 
            && isValidInTransaction(currencyInput.value)
            && dateInput.value.length > 0) {
            
            const newTransaction = {
                balance: balanceInput.value.trim(),
                comment: commentInput.value.trim(),
                currency: currencyInput.value.trim(),
                date: dateInput.value.trim(),
                idUser: localStorage.getItem('userID'),
                title: titleInput.value.trim(),
                id: transaction.id,
            }

            Transaction.edit(newTransaction);

            transactionDiv.classList.toggle('edit');
            transactionDiv.removeChild(transactionDiv.querySelector('#edit-transaction-form'));
        }
    });
}

export function createErrorMessageIfUnAuth() {
    const list = document.getElementById('transaction-block');
    const container = document.querySelector('.transaction-container');
    const searchAddDiv = container.querySelector('.search-add-transactions');
    if (searchAddDiv)
        container.removeChild(searchAddDiv);
    const html = '<h1 style="margin: 5vh auto;">Вы ещё не авторизовались!</h1>';
    list.innerHTML = html;
}