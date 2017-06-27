
$(document).ready(function() {
    var options = {
        chart: {
            renderTo: 'container',
            events: {
              load: Highcharts.drawTable
            },
            type: 'spline'
        },
        title: {
            text: 'Daily New User'
        },

        subtitle: {
            text: ' 2017-05-09 ~2017-06-08'
        },
        yAxis: {
              title: {
                  text: 'Number of new Users'
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

          }
        ]
    };

var bus = options.series;
console.log(bus);
// let  series = options.series ; 적절한 이름 생각나면 몽땅 바꾸기

    function drawLineChart(jsonfilePath, i, seriesName){
        $.getJSON(jsonfilePath, function(data) {

        options.series[i].name = seriesName
        options.series[i].data =[];
        data.forEach(function(item){
          options.series[i].data.push({name:item.key_as_string,y:item.doc_count})
        })
        var chart = new Highcharts.Chart(options);
        window.chart = new Highcharts.chart(options);
    });
    }


  function ChangeSeriesColor(i,color){
    options.series[i].color = color;
  }

// 시리즈 색깔 선택
  ChangeSeriesColor(0,"#82ee37");
  ChangeSeriesColor(1,"#c43a16");
  ChangeSeriesColor(2,"#3bd4d4");

// 라인 챠트 그리기
drawLineChart('/data/user_signedup.json', 0, "NewUser");
drawLineChart('/data/user_deleted.json', 1, "LeaveUser");
drawLineChart('/data/user_signedup.json', 2, "TotalAddedUser")

// 빼는 거 프로미스를 해야 될 텐데 .//


Highcharts.drawTable = function() {

console.log("이거 실행 됬나?.........");
   // user options
   var tableTop = 300,
       colWidth = 100,
       tableLeft = 20,
       rowHeight = 20,
       cellPadding = 2.5,
       valueDecimals = 1,
       valueSuffix = ' 명';

   // internal variables
   var chart = this,
       series = chart.series;
       renderer = chart.renderer,
       cellLeft = tableLeft;




   // draw category labels
   $.each(series[0].data, function(i, item) {
       renderer.text(
           item.name,
           cellLeft + cellPadding,
           tableTop + (i + 2) * rowHeight - cellPadding
       )
       .css({
           fontWeight: 'bold'
       })
       .add();
   });

   $.each(series, function(i, serie) {
       cellLeft += colWidth;

       // Apply the cell text
       renderer.text(
               serie.name,
               cellLeft - cellPadding + colWidth,
               tableTop + rowHeight - cellPadding
           )
           .attr({
               align: 'right'
           })
           .css({
               fontWeight: 'bold'
           })
           .add();

       $.each(serie.data, function(row, point) {
           // Apply the cell text
           renderer.text(
                   Highcharts.numberFormat(point.y, valueDecimals) + valueSuffix,
                   cellLeft + colWidth - cellPadding,
                   tableTop + (row + 2) * rowHeight - cellPadding
               )
               .attr({
                   align: 'right'
               })
               .add();

           // horizontal lines
           if (row == 0) {
               Highcharts.tableLine( // top
                   renderer,
                   tableLeft,
                   tableTop + cellPadding,
                   cellLeft + colWidth,
                   tableTop + cellPadding
               );
               Highcharts.tableLine( // bottom
                   renderer,
                   tableLeft,
                   tableTop + (serie.data.length + 1) * rowHeight + cellPadding,
                   cellLeft + colWidth,
                   tableTop + (serie.data.length + 1) * rowHeight + cellPadding
               );
           }
           // horizontal line
           Highcharts.tableLine(
               renderer,
               tableLeft,
               tableTop + row * rowHeight + rowHeight + cellPadding,
               cellLeft + colWidth,
               tableTop + row * rowHeight + rowHeight + cellPadding
           );

       });

       // vertical lines
       if (i == 0) { // left table border
           Highcharts.tableLine(
               renderer,
               tableLeft,
               tableTop + cellPadding,
               tableLeft,
               tableTop + (serie.data.length + 1) * rowHeight + cellPadding
           );
       }

       Highcharts.tableLine(
           renderer,
           cellLeft,
           tableTop + cellPadding,
           cellLeft,
           tableTop + (serie.data.length + 1) * rowHeight + cellPadding
       );

       if (i == series.length - 1) { // right table border

           Highcharts.tableLine(
               renderer,
               cellLeft + colWidth,
               tableTop + cellPadding,
               cellLeft + colWidth,
               tableTop + (serie.data.length + 1) * rowHeight + cellPadding
           );
       }

   });


};

/**
* Draw a single line in the table
*/
Highcharts.tableLine = function (renderer, x1, y1, x2, y2) {
   renderer.path(['M', x1, y1, 'L', x2, y2])
       .attr({
           'stroke': 'silver',
           'stroke-width': 1
       })
       .add();
}



var table_options = {

  chart: {
      renderTo: 'datatable',
      events: {
          load: Highcharts.drawTable
      },
      type: 'column',
      borderWidth: 1
  },

  title: {
      text: 'Daily New User'
  },

  subtitle: {
      text: ' 2017-05-09 ~2017-06-08'
  },
  yAxis: {
        title: {
            text: 'Number of new Users'
        }
    },
    xAxis: {
     type: 'category'
   },
  legend: {
      y: -300
  },

  series: [{},{},{}]
};

function drawTableChart(jsonfilePath, i, seriesName){
    $.getJSON(jsonfilePath, function(data) {

    table_options.series[i].name = seriesName
    table_options.series[i].data =[];
    data.forEach(function(item){
      table_options.series[i].data.push({name:item.key_as_string,y:item.doc_count})
    })
    var chart = new Highcharts.Chart(table_options);
});
}



drawTableChart('/data/user_signedup.json', 0, "NewUser");
drawTableChart('/data/user_deleted.json', 1, "LeaveUser");
drawTableChart('/data/user_signedup.json', 2, "TotalAddedUser")






});
