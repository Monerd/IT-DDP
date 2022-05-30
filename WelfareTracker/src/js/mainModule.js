import { Transaction, getTransactionsFromLocalStorage } from "./transaction";
import { editTransaction } from "./transactionModule";

export function createGoogleChart() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    
    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Month', 'Balance'],
            ['January', 5002],
            ['February', 6010],
            ['March', 7021],
            ['April', 2400],
            ['May', 10000],
            ['June', 10000],
            ['July', 10000],
        ['August', 10000],
        ['September', 12000],
        ['October', 9000],
        ['November', 10230],
        ['December', 10780]
        ]);
        
        var options = {
            legend: { position: 'none' },
            vAxis: { format: 'currency' },
        };
        
        var chart = new google.visualization.LineChart(document.getElementById('googlechart'));
        chart.draw(data, options);
    }
}

export function updateBalanceOnPage() {
    if (window.location.pathname === '/' || window.location.pathname === '/review') {
        const balance = localStorage.getItem('userBalance');
        if (balance) {
            const el = document.querySelector('.balance-count');
            const html = `${balance}$`;
            el.innerHTML = html;
        }
    }
}

export function createForecastTable() {
    const table = document.querySelector('.forecast-table');
    
    const months = [
    'январь', 'февраль', 'март',
    'апрель', 'май', 'июнь',
    'июль', 'август','сентябрь',
    'октябрь', 'ноябрь', 'декабрь'
    ];

    for (let i = 0; i < 3; i++) {
        const tr = document.createElement('tr');
        for (let j = 0; j < 12; j++) {
            const td = document.createElement('td');
            i == 0 ? td.textContent = months[j] : td.textContent = '0';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

export function unshowModal() {
    const burger = document.querySelector('.button-burger');
    if (burger.classList.contains('open')) {
        burger.classList.toggle('open');
        const modalContainer = document.getElementById('modal-container');
        modalContainer.classList.toggle('active');
    }
}

export function blockUnblockLogIn() {
    if (localStorage.getItem('userEmail')) {
        setEmailForModal();
        const modalItems = document.querySelectorAll('.modal-item');
        modalItems.forEach(item => item.classList.toggle('active'));
    }
}

function setEmailForModal() {
    const userH2 = document.getElementById('user-email');
    const email = `${localStorage.getItem('userEmail')}`;
    userH2.innerHTML = email;
}

window.addEventListener(`resize`, () => {
    if (window.location.pathname === '/' || window.location.pathname === '/review')
    createGoogleChart();
}, false);

window.switchChartTable = function(id) {
    const forecast = document.getElementById('forecastSection');
    const planned = document.getElementById('plannedSection');
    const chart = document.getElementById('chartSection');
    switch(id) {
        case 'plannedSection': {
            forecast.style.display = 'block';
            planned.style.display = 'block';
            chart.style.display = 'none';
            break;
        }
        case 'chartSection': {
            forecast.style.display = 'none';
            planned.style.display = 'none';
            chart.style.display = 'block';
            break;
        }
        default:
            break;
    }
}

window.showTransactionForm = function () {
    const transactionBlock = document.getElementById('transaction-div-form');
    transactionBlock.classList.toggle('active');
}

window.showModal = function () {
    const burger = document.querySelector('.button-burger');
    burger.classList.toggle('open');
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.toggle('active');
}

window.userExit = function () {
    window.history.pushState({}, "", '/review');
    blockUnblockLogIn();
    localStorage.clear();
    route();
}

window.editTransactionWithID = (id) => {
    const transactionDiv = document.getElementById(`${id}`);
    if (transactionDiv.classList.contains('edit')) {
        transactionDiv.classList.toggle('edit');
        transactionDiv.removeChild(transactionDiv.querySelector('#edit-transaction-form'));
    }
    else {
        transactionDiv.classList.toggle('edit');
        editTransaction(id);
    }
}

window.deleteTransactionWithID = (id) => {
    Transaction.delete(id);
}
