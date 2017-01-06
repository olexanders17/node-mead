var expect = require('expect');
var request = require('supertest');


var app = require('./../server').app;
var Todo = require("../models/todo").Todo;

var todos = [{
    text: "first text todo"
}, {
    text: "second text todo"
}
];


beforeEach(function (done) {
    Todo.remove()
        .then(function () {
            return Todo.insertMany(todos);
        }).then(function () {
        return done();
    })
})


describe("POST /todos", function () {
    it("should create new todo", function (done) {
        var txt = "Test todo text";
        request(app)
            .post("/todos")
            .send({text: txt})
            .expect(200)
            .expect(function (res) {
                expect(res.body.text).toBe(txt)
            })
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }
                Todo.find()
                    .then(function (todos) {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(txt);
                        done();
                    })
                    .catch(function (err) {
                        done(err);
                    });
            })

    })
    it("should not crete todo woth invalid body data", function (done) {

        request(app)
            .post("/todos")
            .send({})
            .expect(400)
            .end(function (err, res) {
                if (err) {
                    return done(err)
                }
                Todo.find().then(function (todos) {
                    expect(todos.length).toBe(0);
                    done();
                }).catch(function (err) {
                    done(err)
                });

            })


    });

})


describe("GET /todos", function () {
    it("should be list of todos", function () {

        request(app)
            .get("/todos")
            .expect(200)
            .expect(function (res) {


                expect(res.todos.length).toBeGreaterThan(1);


            })
    })
});

