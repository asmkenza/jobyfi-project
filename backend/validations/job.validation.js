const Joi = require('joi');

function validateJob(obj) {
    const schema = Joi.object({
        position: Joi.string().trim().min(3).max(100).required(),
        company: Joi.string().trim().min(2).max(100).required(),
        location: Joi.string().trim().min(2).max(100).required(),
        status: Joi.string().valid('pending', 'interview', 'declined'),
        type: Joi.string().valid('full-time', 'part-time', 'internship').required(),
    });
    return schema.validate(obj);
}

function validateUpdateJob(obj) {
    const schema = Joi.object({
        position: Joi.string().trim().min(3).max(100),
        company: Joi.string().trim().min(2).max(100),
        location: Joi.string().trim().min(2).max(100),
        status: Joi.string().valid('pending', 'interview', 'declined'),
        type: Joi.string().valid('full-time', 'part-time', 'internship'),
    });
    return schema.validate(obj);
}

module.exports = { validateJob, validateUpdateJob };
