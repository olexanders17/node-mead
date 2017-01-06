var mongoose=require('mongoose');
User = mongoose.model('user', {
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    }
})

module.exports = {User};