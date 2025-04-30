const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true
    },
    type: {
        type: String,
        required: true,
        enum: ['full-time', 'part-time', 'internship', 'contract', 'temporary'],
    },
    description: {
        type: String,
        required: [true, 'Job description is required']
    },
    requirements: {
        type: [String],
        required: [true, 'Job requirements are required']
    },
    responsibilities: {
        type: [String],
        required: [true, 'Job responsibilities are required']
    },
    qualifications: {
        education: [String],
        experience: String,
        skills: [String],
        languages: [{
            language: String,
            level: {
                type: String,
                enum: ['basic', 'intermediate', 'fluent', 'native']
            }
        }]
    },
    location: {
        type: {
            type: String,
            enum: ['remote', 'on-site', 'hybrid']
        },
        city: String,
        country: String,
        address: String
    },
    salary: {
        min: Number,
        max: Number,
        currency: {
            type: String,
            default: 'USD'
        },
        period: {
            type: String,
            enum: ['hourly', 'monthly', 'yearly']
        },
        isNegotiable: {
            type: Boolean,
            default: false
        }
    },
    benefits: [{
        type: String,
        trim: true
    }],
    department: {
        type: String,
        required: true
    },
    enterprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    status: {
        type: String,
        enum: ['draft', 'published', 'closed', 'archived'],
        default: 'draft'
    },
    applicationDeadline: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date
    },
    duration: {
        value: Number,
        unit: {
            type: String,
            enum: ['days', 'weeks', 'months', 'years']
        }
    },
    numberOfOpenings: {
        type: Number,
        default: 1
    },
    workingHours: {
        from: String,
        to: String,
        totalHours: Number,
        schedule: String // e.g., "Monday to Friday" or "Flexible"
    },
    tags: [{
        type: String,
        trim: true
    }],
    requiredDocuments: [{
        type: String,
        enum: ['resume', 'coverLetter', 'portfolio', 'certificates', 'recommendations']
    }],
    screeningQuestions: [{
        question: String,
        required: {
            type: Boolean,
            default: true
        }
    }],
    views: {
        type: Number,
        default: 0
    },
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

// Create indexes for better search performance
jobSchema.index({ title: 'text', description: 'text', 'qualifications.skills': 'text' });
jobSchema.index({ status: 1, applicationDeadline: 1 });
jobSchema.index({ enterprise: 1, createdAt: -1 });

// Update the updatedAt timestamp on save
jobSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual for checking if job posting is expired
jobSchema.virtual('isExpired').get(function() {
    return Date.now() > this.applicationDeadline;
});

// Virtual for application count
jobSchema.virtual('applicationCount').get(function() {
    return this.applications.length;
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;