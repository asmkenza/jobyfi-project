const mongoose = require('mongoose');
const Joi = require('joi');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 200,
    },
    location: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);


module.exports = { User };
