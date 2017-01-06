var {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', function (err, db) {
    if (err) {
        return console.log(err);
    }

    db.collection('Todos')
        .findOneAndUpdate({text: "one"},
            {
                $set: {compleeted: true},
                $inc: {age: 10}
            }
        )
        .then(function (data) {
            console.log(" :", "data=", data);
        });


    db.close();
});

