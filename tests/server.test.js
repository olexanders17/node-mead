var expect = require('expect');
var request = require('supertest');
var _ = require('lodash');


var app = require('./../server').app;
var Todo = require("../models/todo").Todo;
var ObjectID = require('mongodb').ObjectID;
const {todos, populate, populateUsers, users}=require('./seed');


beforeEach(populateUsers);
beforeEach(populate);


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


describe("DELETE /todos:id", function () {


    it("should delete todo", (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo_id).toBe(hexId);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId)
                    .then((todos) => {

                        expect(todos).toNotExist();
                        done();
                    })
                    .catch((err) => done(err))
            })

    })


    it("should return 404 if todo not found", (done) => {
        var hexId = new ObjectID();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(400)
            .end(done);
    });
    it("should return 404 if Object ID id invalid", () => {
    });


});


describe("PATCH /todo:id", (done) => {
    it("shold update todo", () => {
        var todo = todos[1]._id;
        text = "new updated text";

        request(app)
            .patch(`/todos/${todo}`)
            .send({
                text,
                completed: true
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
            })
            .end(done);


    });
    it("shold clear completed at if todo is not competed", () => {
    });

});

describe('GET /users/me', function () {
    it("should return user is autenticate", (done) => {

        console.log(" :", "users=", users[0].tokens[0].token);
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(users[0]._id.toHexString())
            })
            .end(done);

    });
    it("should return 401  is not autenticate", (done) => {
    });
})