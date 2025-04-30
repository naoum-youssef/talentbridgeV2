const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    recipient: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: 'recipient.userModel'
        },
        userModel: {
            type: String,
            required: true,
            enum: ['Candidat', 'Enterprise', 'Admin']
        }
    },
    type: {
        type: String,
        required: true,
        enum: [
            // Application related
            'application_submitted',
            'application_status_changed',
            'interview_scheduled',
            'interview_reminder',
            'application_accepted',
            'application_rejected',
            
            // Job related
            'new_job_matching',
            'job_status_changed',
            'job_expired',
            'job_application_received',
            
            // Profile related
            'profile_incomplete',
            'document_uploaded',
            'verification_status_changed',
            
            // System related
            'account_created',
            'password_changed',
            'system_maintenance',
            
            // Message related
            'new_message',
            'message_read'
        ]
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    data: {
        // Dynamic data related to the notification
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    links: {
        action: String, // URL or route for the main action
        secondary: String // Optional secondary action URL
    },
    status: {
        read: {
            type: Boolean,
            default: false
        },
        readAt: Date,
        clicked: {
            type: Boolean,
            default: false
        },
        clickedAt: Date
    },
    delivery: {
        channels: [{
            type: String,
            enum: ['in_app', 'email', 'push', 'sms'],
            default: ['in_app']
        }],
        sent: {
            type: Boolean,
            default: false
        },
        sentAt: Date,
        error: String
    },
    expiresAt: {
        type: Date,
        default: () => new Date(+new Date() + 30*24*60*60*1000) // 30 days from creation
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
}, {
    timestamps: true
});

// Indexes for better query performance
notificationSchema.index({ 'recipient.userId': 1, createdAt: -1 });
notificationSchema.index({ 'status.read': 1, createdAt: -1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index for automatic deletion

// Update timestamps
notificationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Mark as read
notificationSchema.methods.markAsRead = function() {
    this.status.read = true;
    this.status.readAt = new Date();
    return this.save();
};

// Mark as clicked
notificationSchema.methods.markAsClicked = function() {
    this.status.clicked = true;
    this.status.clickedAt = new Date();
    return this.save();
};

// Mark as sent
notificationSchema.methods.markAsSent = function(channel) {
    this.delivery.sent = true;
    this.delivery.sentAt = new Date();
    if (channel && !this.delivery.channels.includes(channel)) {
        this.delivery.channels.push(channel);
    }
    return this.save();
};

// Virtual for notification age
notificationSchema.virtual('age').get(function() {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)); // Age in days
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;