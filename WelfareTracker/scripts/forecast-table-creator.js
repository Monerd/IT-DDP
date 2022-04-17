let table = document.querySelector('.forecast-table');

let months = [
    'январь', 'февраль', 'март',
    'апрель', 'май', 'июнь',
    'июль', 'август','сентябрь',
    'октябрь', 'ноябрь', 'декабрь'
];

for (let i = 0; i < 3; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < 12; j++) {
        let td = document.createElement('td');
        i == 0 ? td.textContent = months[j] : td.textContent = '0';
        tr.appendChild(td);
    }
    table.appendChild(tr);
}