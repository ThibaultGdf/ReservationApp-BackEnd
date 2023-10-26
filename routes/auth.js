const express = require('express'); // Authentification : Impoter EXPRESS qui permet
const router = express.Router(); // Authentification : Express possède router qui permet de gérer la partie relative aux routes, recevoir et traiter des requetes http
const jwt = require('jsonwebtoken'); // Authentification : Impoter JSONWEBTOKEN pour que le serveur verrifie que le token est bon pour que l'utilisateur puisse s'identifier + Déclarer dans le fichier /routes/index.json
const bcrypt = require('bcrypt'); // Authentification : Importer BCRYPT pour hasher les mot de passes
const { User } = require('../db'); // Cette ligne importe le modèle d'utilisateur depuis le module '../db'.


// ---------------------------------- Authentification : Création de la route SignUP ----------------------------------


const emailValidator = (email) => { // Fonction qui permet de verrifier l'email est valide grâce au regEX
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for a basic email validation
    return emailRegex.test(email);
  };
  
router.post('/signup', async (req, res, next) => { // Cette route gère la création de nouveaux utilisateurs lorsqu'un client effectue une requête POST à "/signup".

     // Déclaration de la constante pour hasher le mot de passe 
    const salt = await bcrypt.genSalt(10); // Génère un sel (salt) aléatoire pour le hachage sécurisé du mot de passe. Le chiffre "10" représente le coût du hachage.
    const hashedPassword = await bcrypt.hash(req.body.password, salt); // Hachage du mot de passe en utilisant le sel généré
    const { firstName, lastName, role, email, phoneNumber } = req.body // Création d'un objet utilisateur avec le nom d'utilisateur et le mot de passe haché
    
// Validate email format
if (!emailValidator(email)) {
    return res
      .status(400)
      .json({ error: "Email input is not in a valid email format." });
  }

    const user = {
        firstName, 
        lastName, 
        role, 
        email, 
        phoneNumber,
        password: hashedPassword
    };   // Création d'un nouvel utilisateur dans la base de données
     try {
     await User.create(user);  // Utilise un modèle de base de données pour créer un nouvel utilisateur dans la base de données.
     
     res.status(201).json(user)
    // res.json({message: "L'utilisateur est bien crée", user}) // Réponse au client avec un message de réussite et les détails de l'utilisateur créé
} catch (error) {
    res.status(500).send(error.message)    
}
});


// ---------------------------------- Authentification : Création de la route SignIN ----------------------------------

const SECRET_KEY = 'secretkey23456'; // A remplacer par une clé secrète

router.post('/signin', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

    if (!user) return res.status(400).json({message: `Nom d'utilisateur ou mot de passe incorrect`});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({message: `Nom d'utilisateur ou mot de passe incorrect`});

    const payload = {
        email: req.body.email, // Crée un objet "payload" avec la propriété "email" de l'objet "user"
        id: user.id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Génère un jeton (token) JWT en utilisant le contenu de "payload", une clé secrète (SECRET_KEY) et une expiration d'1 heure.

    res.json({ message: token }); // Envoie une réponse JSON au client contenant le jeton JWT généré avec un message.
});

module.exports = router;