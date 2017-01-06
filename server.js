var express = require('express');
var bodyParser = require('body-parser');

var {mongoose}=require("./db/mongoose");
var {Todo}=require("./models/todo");
var {User}=require("./models/user");


var app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post("/todos", function (req, res) {
    console.log(" :", "/todo=");
    var todo = new Todo(req.body);
    todo.save()
        .then(function (todo) {

            res.send(todo);
        })
        .catch(function (e) {
            res.status(400).send(e);
        });


});


app.get("/todos", function (req, res) {
    Todo.find({})
        .then(function (todos) {
            res.send({todos, statusCode: 200});
        })
        .catch(function (err) {
            res.send(err);
        })
});


app.get("/", function (req, res) {
    res.send("hello world")
});


app.listen(3000, () => console.log("listen on 3000"))

module.exports.app = app;