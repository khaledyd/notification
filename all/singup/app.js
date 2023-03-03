const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3000
app.use(express.static("public"));

app.get('/', function(req ,res) {
res.sendFile(__dirname +"/singup.html")
})
app.post("/", function(req , res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName, lastName , email );
    
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})