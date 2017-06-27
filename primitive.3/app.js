var express = require('express');
var app = express();

app.listen(3000, function(){
  console.log("Start!!!!!!!!!!!!!!!!!!!");
})

app.use(express.static('views'))

app.get('/', function(req,res){
  res.sendFile(__dirname+"/views/index2.html")
})



//static파일
