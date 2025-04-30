const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidat',
        required: true
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    enterprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'accepted', 'rejected', 'withdrawn'],
        default: 'pending'
    },
    documents: {
        resume: {
            url: String,
            uploadedAt: Date
        },
        coverLetter: {
            url: String,
            uploadedAt: Date
        },
        portfolio: {
            url: String,
            uploadedAt: Date
        },
        certificates: [{
            name: String,
            url: String,
            uploadedAt: Date
        }],
        recommendations: [{
            name: String,
            url: String,
            uploadedAt: Date
        }]
    },
    screeningAnswers: [{
        question: String,
        answer: String,
        answeredAt: Date
    }],
    experience: {
        relevantExperience: String,
        yearsOfExperience: Number,
        currentPosition: String,
        currentCompany: String
    },
    expectedSalary: {
        amount: Number,
        currency: {
            type: String,
            default: 'USD'
        },
        period: {
            type: String,
            enum: ['hourly', 'monthly', 'yearly']
        }
    },
    availableStartDate: Date,
    noticePeriod: {
        duration: Number,
        unit: {
            type: String,
            enum: ['days', 'weeks', 'months']
        }
    },
    interviews: [{
        scheduledDate: Date,
        type: {
            type: String,
            enum: ['phone', 'video', 'onsite', 'technical', 'hr']
        },
        status: {
            type: String,
            enum: ['scheduled', 'completed', 'cancelled', 'rescheduled']
        },
        feedback: {
            rating: Number,
            comments: String,
            interviewer: String
        },
        location: String, // For onsite interviews
        meetingLink: String, // For video interviews
        notes: String
    }],
    evaluations: [{
        criterion: String,
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comments: String,
        evaluatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        evaluatedAt: Date
    }],
    notes: [{
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    timeline: [{
        status: String,
        date: Date,
        comment: String,
        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admin'
        }
    }],
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for better query performance
applicationSchema.index({ candidate: 1, job: 1 }, { unique: true }); // Prevent duplicate applications
applicationSchema.index({ enterprise: 1, status: 1 });
applicationSchema.index({ createdAt: -1 });

// Update the updatedAt timestamp and add timeline entry on status change
applicationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    
    if (this.isModified('status')) {
        this.timeline.push({
            status: this.status,
            date: Date.now(),
            comment: 'Status updated'
        });
    }
    next();
});

// Virtual for application age
applicationSchema.virtual('applicationAge').get(function() {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // Age in days
});

// Virtual for latest interview
applicationSchema.virtual('latestInterview').get(function() {
    if (this.interviews && this.interviews.length > 0) {
        return this.interviews.sort((a, b) => b.scheduledDate - a.scheduledDate)[0];
    }
    return null;
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;