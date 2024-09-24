const Joi = require('joi');

const qoute_validation = Joi.object({
    name: Joi.string().min(2).max(50).required("add number"),
    email: Joi.string().min(2).max(50).required("please enter email").email(),
    phone: Joi.string().length(10).required("please enter number"),
    message: Joi.string()
});

const contact_validation = Joi.object({
    name: Joi.string().min(2).max(50).required("add number"),
    email: Joi.string().min(2).max(50).required("please enter email").email(),
    subject: Joi.string().max(50),
    message: Joi.string()
});

const admin_validation = Joi.object({
    username: Joi.string().min(2).max(50).required("enter username"),
    password : Joi.string().max(20).min(5).required("please enter password")
});

module.exports = {
    qoute_validation,
    contact_validation,
    admin_validation
};