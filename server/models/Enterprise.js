const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const entrepriseSchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        userType: {
            type: String,
            default: 'entreprise'
        },
        // Champs spécifiques à l'entreprise
        industry: {
            type: String,
            required: true,
        },
        contactPerson: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        description: {
            type: String,
        },
        isApproved: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
    }
);

// Méthode pour comparer les mots de passe
entrepriseSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware pour hasher le mot de passe avant sauvegarde
entrepriseSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Entreprise = mongoose.model('Entreprise', entrepriseSchema);

module.exports = Entreprise;