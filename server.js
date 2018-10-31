

var express = require('express');

var app = express();

//serve static files
app.use(express.static('public'));
app.use(express.static(__dirname + '/node_modules'));
//app.use(express.static('node_modules'));

//the route
app.get('/', function(request, response){
    response.send("Hey, hello from the server!");
});

app.listen(8000);
console.log("server listen on port 8000...");
