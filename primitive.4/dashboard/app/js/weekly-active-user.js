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
            text: ' 2017-05-09 ~2017-06-08'
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

    Highcharts.drawTable = function() {


       var tableTop = 30,
           colWidth = 100,
           tableLeft = 30,
           rowHeight = 30,
           cellPadding = 2.5,
           valueDecimals = 1,
           valueSuffix = ' 명';

       // internal variables
       var chart = this,
           series = options_wau.series,
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



    var wau_table_options = {

      chart: {
          renderTo: 'wau-table',
          events: {
              load: Highcharts.drawTable
          },
          borderWidth: 2
      },

      title: {
          text: 'Weekly Active User'
      },

      // subtitle: {
      //     text: ' 2017-05-09 ~2017-06-08'
      // },
      yAxis: {
            title: {
                text: 'Number of new Users table'
            }
        },
        xAxis: {
         type: 'category'
       },
      legend: {
          y: -300
      },
    };


    var showWauTable = document.querySelector('.show-wau-btn');
    console.log(showWauTable);
    // 테이블 버튼 만들어서 클릭하면 보여주도록
    showWauTable.addEventListener("click",function(){
        var chart = new Highcharts.Chart(wau_table_options);
    })









});
