// var activeUserLink = document.querySelector('.active-user-link');
// activeUserLink.addEventListener('click',function(){
//   document.querySelector('.new-user-active').
// })
$(document).ready(function() {


    var options_dau = {
        chart: {
            renderTo: 'dauList',
            // events: {
            //   load: Highcharts.drawTable
            // },
            type: 'spline'
        },
        title: {
            text: 'Daily Active User'
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

        options_dau.series[i].name = seriesName
        options_dau.series[i].data =[];
        data.forEach(function(item){
          options_dau.series[i].data.push({name:item.key,y:item.doc_count})
        })
        var chart = new Highcharts.Chart(options_dau);
    });
    }
    function ChangeSeriesColor(i,color){
      options_dau.series[i].color = color;
    }

    ChangeSeriesColor(0,"#82ee37");
    ChangeSeriesColor(1,"#c43a16");
    ChangeSeriesColor(2,"#d43bbb");
    ChangeSeriesColor(3,"#ec930d");
    ChangeSeriesColor(4,"#3bd4d4");
    // ChangeSeriesColor(5,"#3b46d4");


    drawLineChart('/data2/dau_japan.json', 0, "Dau_Japan");
    drawLineChart('/data2/dau_korea.json', 1, "Dau_Korea");
    drawLineChart('/data2/dau_parent.json', 2, "Dau_Parent");
    drawLineChart('/data2/dau_student.json', 3, "Dau_Student");
    drawLineChart('/data2/dau_teacher.json', 4, "Dau_teacher");
});
