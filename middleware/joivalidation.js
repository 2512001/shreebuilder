const { contact_validation } = require("../validation/validate");
const expressError = require('../utils/expressErr');

module.exports.c_valid = async (req, res, next) => {
    try {
        await contact_validation.validateAsync(req.body);
        next();
    } catch (error) {
        next(new expressError(400, error.message)); // Pass the error to the next middleware
    }
};
