require("./config/config");

//console.log(" :", "process.env=", process.env);
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');


var mongoose = require("./db/mongoose").mongoose;
var ObjectID = require('mongodb').ObjectID;
var Todo = require("./models/todo").Todo;
var User = require("./models/user").User;
var authenticate = require("./middleware/authenticate").authenticate;


var app = express();
var port = parseInt(process.env.PORT)||3000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", function (req, res) {
    res.send("hello world")
});

app.post("/todos", function (req, res) {

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

app.get("/todos/:id", function (req, res) {
    Todo.findById(req.params.id)
        .then(function (todos) {
            res.send({todos, statusCode: 200});
        })
        .catch(function (err) {
            res.send(err);
        })
});

app.delete("/todos/:id", function (req, res) {

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("id is not valid");
    }


    Todo.findOneAndRemove({_id: req.params.id})
        .then(function (todos) {
            if (!todos) {
                res.status(400).send("soryy not found")
            } else {
                res.send({todos});

            }


        })
        .catch(function (err) {
            res.send({err})
        })
});


app.patch("/todos/:id", (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'compleeted']);
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("id is not valid");
    }
    if (_.isBoolean(req.body.completed) && req.body.completed) {
        body.completedAt = new Date().getTime();
    }
    else {
        body.completed = false;
        body.completedAt = null;
    }


    Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
        .then((todo) => {

            if (!todo) {
                res.status(404).send();
            }

            res.send(todo);
        })
        .catch((err) => {
            res.status(400).send(err);
        });

});


app.post("/users", (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);


    var user = new User(body);
    user.save()
        .then(() => {

            return user.generateAuthToken();
        })
        .then((token) => {
            res.header('x-auth', token).send(user);
        })
        .catch((err) => {
            res.status(400).send({err});
        })


});


app.get("/users/me", authenticate, function (req, res) {
    res.send(req.user);
});

app.listen(port, () => console.log(`listen on ${port}`))

module.exports.app = app;