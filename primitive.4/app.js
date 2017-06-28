var express = require('express');
var app = express();

app.listen(8080, function(){
  console.log("Start!!!!!!!!!!!!!!!!!!!");
})

app.use(express.static('dashboard'))

app.get('/', function(req,res){
  res.sendFile(__dirname+"/dashboard/html/index.html")
})

app.get('/active', function(req,res){
  res.sendFile(__dirname+"/dashboard/html/active.html")
})


//static파일
