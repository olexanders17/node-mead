var Todo = require("./../models/todo").Todo;
var User = require("./../models/user").User;
var {ObjectID}=require('mongodb');
const jwt = require('jsonwebtoken');

var userOneId = new ObjectID();

var userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'aaa@ddd.df',
    password: 'userPass',
    tokens: [{
        access: "auth",
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]

},

    {
        _id: userTwoId,
        email: 'aassa@ddd.df',
        password: 'userPssass'
    }
];

var todos = [
    {
        _id: new ObjectID(),
        text: "first text todo"
    },
    {
        _id: new ObjectID(),
        text: "second text todo",
        completedAt: 3333
    }
];


var populate = function (done) {
    Todo.remove()
        .then(function () {
            return Todo.insertMany(todos);
        }).then(function () {
        return done();
    })
}


var populateUsers = function (done) {
    User.remove({})
        .then(function () {
            var userOne = new User(users[0]).save();
            var userTwo = new User(users[1]).save();


            return Promise.all([userOne, userTwo])
                .then(function (a, b) {
                    return done();
                })

        })


}


module.exports = {todos, populate, users, populateUsers};
