var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');


var UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: value => validator.isEmail(value),
            message: "{VALUE} is not valid"
        }

    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }
    ]
})

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObject = user.toObject()

    return _.pick(userObject, ['_id', 'email']);

};


UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens.push({access, token});

    return user.save().then(function () {
        return token;
    })
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        var decoded = jwt.verify(token, 'abc123');
    }
    catch (e) {
        return Promise.reject("sorry ");

    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });


}

UserSchema.pre('save', function (next) {

    var user = this;
    var salt = '1';
    if (user.isModified('password')) {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                user.password = hash;
                next();
            })
        })

    } else {
        next();
    }


})


User = mongoose.model('user', UserSchema);

module.exports = {User};