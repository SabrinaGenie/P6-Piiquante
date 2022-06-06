const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors')
const path = require('path');
const URL = "mongodb+srv://SabrinaG:Sg123581321@cluster0.gdcmo.mongodb.net/?retryWrites=true&w=majority";

const saucesRoutes = require("./routes/sauces");
const userRoutes = require('./routes/user');

//Connexion à MongoDB Atlas avec Mongoose
mongoose.connect(URL,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Connexion avec Express
const app = express();

//Middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json()); 
app.use(cors());

//Enregistrement des images
app.use('/images', express.static(path.join(__dirname, 'images')))

//Routes pour les sauces et les utilisateurs
app.use('/api/sauces', saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;