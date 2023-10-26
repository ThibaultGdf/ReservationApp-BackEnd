var express = require('express');
var router = express.Router();
const { Reservation } = require('../db.js');

/* GET home page. */

router.get('/reservations', async (req, res, next) => { // Définit une route HTTP GET sur le chemin racine ("/").

    // Commence un bloc try-catch pour gérer les erreurs potentielles.
    try {
        const reservations = await Reservation.findAll(); // Utilise Sequelize pour récupérer toutes les réservations de la base de données.
        res.json({ reservations }); // Envoie une réponse JSON au client avec les réservations récupérées.
    } catch (error) { // Si une erreur se produit, elle est transmise au middleware suivant pour gestion.
        next(error);
    }
});

module.exports = router;
