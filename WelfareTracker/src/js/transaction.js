export class Transaction {
    static create(transaction) {
        return fetch('https://welfaretracker-df7ad-default-rtdb.firebaseio.com/transactions.json', {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    static edit(transaction) {
        return fetch(`https://welfaretracker-df7ad-default-rtdb.firebaseio.com/transactions/${transaction.id}.json`, {
            method: 'PUT',
            body: JSON.stringify(transaction)
        });
    }

    static delete(id) {
        return fetch(`https://welfaretracker-df7ad-default-rtdb.firebaseio.com/transactions/${id}.json`, {
            method: 'DELETE'
        });
    }

    static renderList() {
        const transactions = getTransactionsFromLocalStorage();
        const block = document.getElementById('transaction-block');
        let html = '';
        if (transactions.length) {
            transactions.sort((a, b) => {
                const x = new Date(a.date);
                const y = new Date(b.date);
                return y - x;
            })

            const nowDate = new Date().toISOString();
            const futureTransactions = [];
            const pastTransactions = [];
            transactions.forEach(t => {
                const curDate = new Date(t.date).toISOString();
                nowDate < curDate ? futureTransactions.push(t) : pastTransactions.push(t);
            });
            if (window.location.pathname === '/transactions') {
                html = pastTransactions.length ? pastTransactions.map(toCard).join('') : '<h1 style="margin: 5vh auto;">Транзакции отсутствуют</h1>';
            }
            else {
                html = futureTransactions.length ? futureTransactions.map(toCard).join('') : '<h1 style="margin: 5vh auto;">Транзакции отсутствуют</h1>';
            }
        }
        else {
            html = '<h1 style="margin: 5vh auto;">Транзакции отсутствуют</h1>';
        }
        block.innerHTML = html;
    }
}

export function getTransactionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem(`transactions-${localStorage.getItem('userID')}`));
}

function toCard(transaction) {
    return `<div id="${transaction.id}" class="transaction">
                <div class="transaction-date"><span>${new Date(transaction.date).toLocaleDateString()}</span></div>
                <div class="transaction-info">
                    <div class="transaction-info-title">
                        <h2>${transaction.title}</h2>
                    </div>
                    <div class="transaction-info-comment">
                        <span class="comment">${transaction.comment}</span>
                    </div>
                </div>
                <div class="transaction-balance"><span>${transaction.balance < 0 ? transaction.balance : '+' + transaction.balance}$</span></div>
                <div class="transaction-account"><span>${transaction.currency}</span></div>
                <div class="transaction-settings">
                    <div class="transaction-edit">
                        <img src="/svg/pencil.svg" alt="edit" style="cursor: pointer;" onclick="editTransactionWithID('${transaction.id}')">
                    </div>
                    <div class="transaction-delete">
                        <img src="/svg/trash.svg" alt="delete" style="cursor: pointer;" onclick="deleteTransactionWithID('${transaction.id}')">
                    </div>
                </div>
            </div>`;
}