var {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log(err);
    }


    /*db.collection('Todos')
     .find({})
     .maxScan(2)
     .toArray()
     .then(function (data) {
     console.log(" :", "data=", data);
     }, function (err) {
     console.log(" :", "err=", err);
     });*/

    db.collection('Todos')
        .insertOne({
        text: "saha",
        location: "aaa"
    })
        .then(function (data) {
            console.log(" :", "data=", data.ops);
        }, function (err) {
            console.log(" :", "err=", err);
        });


    db.close();
});

