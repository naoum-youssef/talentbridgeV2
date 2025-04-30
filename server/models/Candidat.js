const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const candidatSchema = mongoose.Schema(
    {
        name: {
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
            default: 'candidat'
        },
        // Champs spécifiques au candidat
        studentId: {
            type: String,
        },
        program: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Méthode pour comparer les mots de passe
candidatSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware pour hasher le mot de passe avant sauvegarde
candidatSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Candidat = mongoose.model('Candidat', candidatSchema);

module.exports = Candidat;