
let chart;
let config;
const resultContainer = document.querySelector('.status');
const dateBlock = document.querySelector('.date');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');


function getData(data, cb) {
    resultContainer.innerHTML = 'Загрузка...';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/getData', true);
    xhr.onload = function (e) {
        let result;
        try {
            result = JSON.parse(xhr.responseText);
        } catch (e) {
            cb({ msg: 'Что-то пошло не так!', status: 'Error' });
        }
        cb(result);
    };
    xhr.send(data);
}

function updateChart(data) {
    resultContainer.innerHTML = data.msg;
    if (data.end) {
        next.style.display = "none";
    } else if (data.start) {
        prev.style.display = "none";
    } else {
        next.style.display = "block";
        prev.style.display = "block";
    }
    dateBlock.innerHTML = data.date;
    config = {
        type: 'bar',
        data: {
            labels: ["Цена закрытия", "Цена открытия", "Максимальная цена", "Минимальная цена"],
            datasets: [{
                label: 'Дневная котировка',
                backgroundColor: 'aquamarine',
                data: [
                    parseFloat(data.close.replace(',', '.')),
                    parseFloat(data.open.replace(',', '.')),
                    parseFloat(data.max.replace(',', '.')),
                    parseFloat(data.min.replace(',', '.'))]
            }]
        }
    };
    if (chart) chart.destroy();
    chart = new Chart(document.getElementById('chart'), config);

}

getData('0', (data) => {
    updateChart(data);
})

prev.addEventListener('click', () => {
    getData('1', (data) => {
        updateChart(data);
    })
})

next.addEventListener('click', () => {
    getData('-1', (data) => {
        updateChart(data);
    })
})