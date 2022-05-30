import { createGoogleChart, createForecastTable, unshowModal, updateBalanceOnPage } from './mainModule';
import { addTransaction, createErrorMessageIfUnAuth } from './transactionModule';
import { Transaction } from './transaction';
import { registrateUser } from './registrateModule';
import { loginUser } from './loginModule';

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routesHtml = {
    404: "404",
    "/": "review",
    "/login": "login",
    "/registration": "registration",
    "/review": "review",
    "/transactions": "transaction",
    "/planned-transactions": "reminders"
};

const handleLocation = async () => {
    unshowModal();
    const path = window.location.pathname;
    const route = routesHtml[path] || routesHtml[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("inner-content").innerHTML = html;
    if (path === "/" || path === "/review") {
        updateBalanceOnPage();
        createForecastTable();
        createGoogleChart();
    }
    else if (path === "/transactions") {
        if (localStorage.getItem('userID')) {
            addTransaction();
            Transaction.renderList();
        }
        else createErrorMessageIfUnAuth();
    }
    else if (path === "/planned-transactions") {
        if (localStorage.getItem('userID')) {
            Transaction.renderList();
        }
        else createErrorMessageIfUnAuth();
    }
    else if (path === "/registration") {
        registrateUser();
    }
    else if (path === "/login") {
        loginUser();
    }
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();