
$(document).ready(function() {
    var options = {
        chart: {
            renderTo: 'container',
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

// let  series = options.series ; 적절한 이름 생각나면 몽땅 바꾸기


    function drawLineChart(jsonfilePath, i, seriesName){
        $.getJSON(jsonfilePath, function(data) {

        options.series[i].name = seriesName
        options.series[i].data =[];
        data.forEach(function(item){
          options.series[i].data.push({name:item.key_as_string,y:item.doc_count})
        })
        var chart = new Highcharts.Chart(options);
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

// 빼는 거 프로미스를 해야 될 텐데 ...
});
