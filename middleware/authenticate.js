var User = require('./../models/user').User;


module.exports . authenticate = function (req, res, next) {
    var token = req.header('x-auth');


    User.findByToken(token)
        .then((user) => {
            if (!user) {
                Promise.reject('user not found');
            }


            req.user = user;
            req.token = token;
            next();


        })
        .catch((err) => {
            res.status(401).send({err});
        })


}
