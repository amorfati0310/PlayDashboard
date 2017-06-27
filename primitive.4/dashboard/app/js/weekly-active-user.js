$(document).ready(function() {


    var options_wau = {
        chart: {
            renderTo: 'wauList',
            // events: {
            //   load: Highcharts.drawTable
            // },
            type: 'spline'
        },
        title: {
            text: 'Weekly Active User'
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

        options_wau.series[i].name = seriesName
        options_wau.series[i].data =[];
        data.forEach(function(item){
          options_wau.series[i].data.push({name:item.key,y:item.doc_count})
        })
        var chart = new Highcharts.Chart(options_wau);
    });
    }
    function ChangeSeriesColor(i,color){
      options_wau.series[i].color = color;
    }

    ChangeSeriesColor(0,"#82ee37");
    ChangeSeriesColor(1,"#c43a16");
    ChangeSeriesColor(2,"#d43bbb");
    ChangeSeriesColor(3,"#ec930d");
    ChangeSeriesColor(4,"#3bd4d4");
    // ChangeSeriesColor(5,"#3b46d4");


    drawLineChart('/data2/wau_japan.json', 0, "Wau_Japan");
    drawLineChart('/data2/wau_korea.json', 1, "Wau_Korea");
    drawLineChart('/data2/wau_parent.json', 2, "Wau_Parent");
    drawLineChart('/data2/wau_student.json', 3, "Wau_Student");
    drawLineChart('/data2/wau_teacher.json', 4, "Wau_teacher");
});
