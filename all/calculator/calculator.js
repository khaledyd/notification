const express = require('express');
const req = require('express/lib/request');
const bodyParser = require ('body-parser');
const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
const port = 80

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html")
})
app.post('/' , function(req , res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);
  var result = num1 * num2;
  res.send("the answer is " + result);

});

// bim calculator
app.get('/bim', function(req, res){
  res.sendFile(__dirname + "/bim.html")
})
app.post('/bim' , function(req , res){
  var v1 = Number(req.body.v1);
  var v2 = Number(req.body.v2);
  var output = v1 / v2;
  res.send("the answer is " + output);

});

app.listen(80, function(){
  console.log(`Example app listening on port ${port}`)
});