const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');



// Chargement des variables d'environnement
dotenv.config();

// Connexion à MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/candidats', require('./routes/candidatRoutes'));
// Vous pouvez ajouter d'autres routes pour les enterprises et les admin plus tard

// Route par défaut
app.get('/', (req, res) => {
    res.send('API TalentBridge est opérationnelle');
});

// Middleware d'erreur
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
    console.log(`Mode: ${process.env.NODE_ENV}`);
});