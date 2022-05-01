function show_frcst_plnd_chrt(id) {
    let forecast = document.getElementById('forecastSection');
    let planned = document.getElementById('plannedSection');
    let chart = document.getElementById('chartSection');
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

function show_add_transaction() {
    let transaction_block = document.getElementById('add-transaction-div');
    transaction_block.style.display == 'none' ? transaction_block.style.display = 'flex' : transaction_block.style.display = 'none';
}