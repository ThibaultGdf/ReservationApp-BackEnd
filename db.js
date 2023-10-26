const { Sequelize, DataTypes } = require('sequelize'); // Importe les objets Sequelize et DataTypes depuis le module 'sequelize'.

const config = require('./config/config.json')['development']; // Charge la configuration de la base de données depuis le fichier 'config.json' pour l'environnement de développement.

// Crée une instance de Sequelize en utilisant les informations de configuration.
const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
  });

  // Importe le modèle de réservation et crée une instance de ce modèle avec la connexion Sequelize.
const Reservation = require('./models/reservation')(sequelize, DataTypes);

// Importe le modèle de chambre et crée une instance de ce modèle avec la connexion Sequelize.
const Room = require('./models/room')(sequelize, DataTypes);

// Importe le modèle de lieu ("spot") et crée une instance de ce modèle avec la connexion Sequelize.
const Spot = require('./models/spot')(sequelize, DataTypes);

// Importe le modèle d'utilisateur et crée une instance de ce modèle avec la connexion Sequelize.
const User = require('./models/user')(sequelize, DataTypes);

// Exporte les modèles et la connexion Sequelize pour les utiliser dans d'autres parties de l'application.
module.exports = {
    Reservation,
    Room,
    Spot,
    User
}