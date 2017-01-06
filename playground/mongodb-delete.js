var {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log(err);
    }


 /*   db.collection('Todos')
        .deleteMany({location:"aaa"})
        .then(function (data) {
            console.log(" :", "data=", data);
        }, function (err) {
            console.log(" :", "err=", err);
        });*/

    /*db.collection('Todos')
        .deleteOne({text:"one"})
        .then(function (data) {
            console.log(" :", "data=", data);
        }, function (err) {
            console.log(" :", "err=", err);
        });*/


    db.collection('Todos')
     .findOneAndDelete({text:"one"})
     .then(function (data) {
     console.log(" :", "data=", data);
     }, function (err) {
     console.log(" :", "err=", err);
     });


    db.close();
});

