import { updateBalanceOnPage } from "./mainModule";

export class Balance {
    static create(uid) {
        const userBalance = {
            user: `${uid}`,
            balance: '0',
        }
        fetch(`https://welfaretracker-df7ad-default-rtdb.firebaseio.com/users.json`, {
            method: 'POST',
            body: JSON.stringify(userBalance),
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    static update() {
        let currentBalance = 0;
        const transactions = JSON.parse(localStorage.getItem(`transactions-${localStorage.getItem('userID')}`));
        transactions.forEach((t) => {
            currentBalance += +(t.balance);
        });
        localStorage.setItem('userBalance', currentBalance);
        updateBalanceOnPage();
    }
}