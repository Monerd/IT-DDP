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