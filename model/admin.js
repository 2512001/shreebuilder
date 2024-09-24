const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const admin_schema = new schema({
    phone: {
        type : Number,
        required: true,
        validate: {
            validator: function (v) {
                return v.toString().length === 10;
            },
            message: 'Phone number must be 10 digits'
        }
    },
    email: String
});

admin_schema.plugin(passportLocalMongoose);

let Admin = mongoose.model("admin" , admin_schema);

module.exports = Admin;


