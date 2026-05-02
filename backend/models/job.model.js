const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    position: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    company: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    location: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'interview', 'declined'],
        default: 'pending'
    },
    type: {
        type: String,
        enum: ['full-time', 'part-time', 'internship'],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema);

module.exports = { Job };
