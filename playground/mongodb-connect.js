var {MongoClient,ObjectID} = require('mongodb');

var a=new ObjectID() ;

MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log(err);
    }

    /*db.collection('Todos')
     .insertOne({
     text: "Some text",
     complited: false
     }, function (err, result) {
     if (err) return console.log("insert", err);
     console.log(" :", "result=", result.ops);

     });*/


    db.collection('Users')
        .insertOne({
            name: "alex",
            age: 25,
            location: "lviv"
        }, function (err, result) {
            if (err) return console.log("insert", err);
            console.log(" :", "result=", result.ops[0]._id.getTimestamp());

        });


    db.close();
});

