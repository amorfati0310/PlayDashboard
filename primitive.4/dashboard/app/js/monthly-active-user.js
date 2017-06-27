$(document).ready(function() {


    var options_mau = {
        chart: {
            renderTo: 'mauList',
            // events: {
            //   load: Highcharts.drawTable
            // },
            type: 'spline'
        },
        title: {
            text: 'Montly Active User'
        },

        subtitle: {
            text: ' 2017-05-02 ~2017-06-08'
        },
        yAxis: {
              title: {
                  text: 'Active User number '
              }
          },
          xAxis: {
           type: 'category',
          tickInterval: 7
         },
          legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'middle'
          },
        tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.name}  : {point.y}명',
    },

    plotOptions: {
      series: {
         allowPointSelect: true

       }
    },

        series: [
          {

          },{

          },{

          },{

          },{

          }
        ]
    };

    function drawLineChart(jsonfilePath, i, seriesName){
        $.getJSON(jsonfilePath, function(data) {

        options_mau.series[i].name = seriesName
        options_mau.series[i].data =[];
        data.forEach(function(item){
          options_mau.series[i].data.push({name:item.key,y:item.doc_count})
        })
        var chart = new Highcharts.Chart(options_mau);
    });
    }
    function ChangeSeriesColor(i,color){
      options_mau.series[i].color = color;
    }

    ChangeSeriesColor(0,"#82ee37");
    ChangeSeriesColor(1,"#c43a16");
    ChangeSeriesColor(2,"#d43bbb");
    ChangeSeriesColor(3,"#ec930d");
    ChangeSeriesColor(4,"#3bd4d4");
    // ChangeSeriesColor(5,"#3b46d4");


    drawLineChart('/data2/mau_japan.json', 0, "Mau_Japan");
    drawLineChart('/data2/mau_korea.json', 1, "Mau_Korea");
    drawLineChart('/data2/mau_parent.json', 2, "Mau_Parent");
    drawLineChart('/data2/mau_student.json', 3, "Mau_Student");
    drawLineChart('/data2/mau_teacher.json', 4, "Mau_teacher");
});
