const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema({
    candidat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Candidat'
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Job'
    },
    interviewDate: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['Vidéo', 'Téléphone', 'En personne', 'Autre']
    },
    duration: {
        type: Number,
        default: 60 // durée en minutes
    },
    interviewers: [
        {
            name: String,
            title: String
        }
    ],
    location: String,
    meetingLink: String,
    instructions: String,
    confirmed: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true,
        enum: ['scheduled', 'completed', 'cancelled', 'rescheduled'],
        default: 'scheduled'
    },
    notes: String
}, {
    timestamps: true
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;