const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const enterpriseSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true
    },
    website: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Company description is required']
    },
    industry: {
        type: String,
        required: [true, 'Industry is required']
    },
    companySize: {
        type: String,
        enum: ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']
    },
    foundedYear: {
        type: Number
    },
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String
    },
    logo: {
        type: String // URL to stored logo
    },
    socialMedia: {
        linkedin: String,
        twitter: String,
        facebook: String
    },
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    jobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    }],
    companyBenefits: [{
        type: String,
        trim: true
    }],
    companyValues: [{
        type: String,
        trim: true
    }],
    role: {
        type: String,
        default: 'enterprise'
    },
    verificationStatus: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending'
    },
    documents: {
        registrationCertificate: String,
        taxDocument: String,
        otherDocuments: [String]
    },
    subscription: {
        plan: {
            type: String,
            enum: ['free', 'basic', 'premium'],
            default: 'free'
        },
        startDate: Date,
        endDate: Date
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

// Pre-save middleware to hash password
enterpriseSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Method to check if password is correct
enterpriseSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// Update the updatedAt timestamp on save
enterpriseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Enterprise = mongoose.model('Enterprise', enterpriseSchema);

module.exports = Enterprise;