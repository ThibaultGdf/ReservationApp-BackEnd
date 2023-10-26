var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
// app.use('/auth', authRouter);
// app.use('/', verifyJWT, indexRouter);

// Définition d'une fonction middleware pour la vérification JWT
const verifyJWT = (req, res, next) => {
  const  SECRET_KEY = "secretkey23456"; // A remplacer par la même clé secrète que dans la route signin
  const token = req.header('Authorization'); // Récupération du token JWT depuis l'en-tête 'Authorization' de la requête

  if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' }); // Vérification si le token est manquant dans l'en-tête de la requête

  try {
    const decoded = jwt.verify(token, SECRET_KEY); // Vérification du token JWT avec la clé secrète pour voir s'ils sont identique
    console.log(decoded); // Affichage des données décodées
    req.user = decoded; // Stockage des données décodées dans la requête (req) pour une utilisation ultérieure
    next(); // Si le token est valide, on passe à la suite
  } catch (e) {
    console.error(e)
    res.status(400).json({ auth: false, message: 'Invalid token.' });  // En cas d'erreur lors de la vérification du token, renvoyer une réponse d'erreur.
  }
};

module.exports = app;
