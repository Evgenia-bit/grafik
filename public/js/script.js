let config;
let resultContainer = document.querySelector('.status');
let dateBlock = document.querySelector('.date');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');



function getData(data, cb) {
    resultContainer.innerHTML = 'Загрузка...';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/getData', true);
    xhr.onload = function (e) {
      let result;
      try {
        result = JSON.parse(xhr.responseText);
      } catch (e) {
        cb({msg: 'Что-то пошло не так!', status: 'Error'});
      }
      cb(result);
    };
    xhr.send(data);
}

function updateChart(data) {
    resultContainer.innerHTML = data.msg;
    dateBlock.innerHTML = data.date;
    config = {
        type: 'bar',
        data: {
            labels: ["Цена закрытия", "Цена открытия", "Максимальная цена", "Минимальная цена"],
            datasets: [{
                label: 'Дневные котировки',
                data: [
                    parseFloat(data.close.replace(',','.')),
                    parseFloat(data.open.replace(',','.')),
                    parseFloat(data.max.replace(',','.')),
                    parseFloat(data.min.replace(',','.'))]
            }]
        }
      };
      new Chart(document.getElementById('myChart'), config);
}

getData('0', (data)=> {
    updateChart(data);
})

prev.addEventListener('click', ()=> {
    getData('1', (data)=> {
        updateChart(data);
    })  
})

next.addEventListener('click', ()=> {
    getData('-1', (data)=> {
        updateChart(data);
    })  
})