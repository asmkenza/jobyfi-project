const Joi = require('joi');

// Validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        location: Joi.string().trim().min(2).max(200).required(),
        email: Joi.string().trim().min(5).max(255).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(255).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}

function validateUpdateUser(obj) {
    const schema = Joi.object({
        name: Joi.string().trim().min(3).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        location: Joi.string().trim().min(2).max(200),
        email: Joi.string().trim().min(5).max(255).email(),
        password: Joi.string().trim().min(8),
    });
    return schema.validate(obj);
}

module.exports = { validateRegisterUser, validateLoginUser, validateUpdateUser };
