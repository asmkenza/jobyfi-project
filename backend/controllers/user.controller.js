const { User } = require('../models/user.model.js');
const { validateRegisterUser, validateLoginUser, validateUpdateUser } = require('../validations/user.validation.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    // Valider les données de la requête
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        // Vérifier si l'utilisateur existe déjà
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ message: 'User already registered.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
    

        // Créer un nouvel utilisateur
        user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            location: req.body.location,
            email: req.body.email,
            password: hashedPassword,
        });

        // Sauvegarder l'utilisateur dans la base de données
        const result = await user.save();
        const token= null; 
        const {password, ...other} = result._doc;
        res.status(201).json({...other, token});
    
    } catch (error) {
        // Gérer les erreurs
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const login= async (req,res) => {

    const {error}=validateLoginUser(req.body);
    if(error){ return res.status(400).json({message:error.details[0].message}); }
    
    let user= await User.findOne({email:req.body.email});
    if(!user){ return res.status(400).json({message:'Invalid email or password'}); }

    const isPasswordMatch= await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordMatch){ return res.status(400).json({message:'Invalid email or password'}); }

    const token= jwt.sign({id:user._id, email:user.email},process.env.SECRET_KEY, {expiresIn:process.env.TOKEN_EXPIRATION}); 

    const {password, ...other}=user._doc;
    res.status(200).json({...other, token}); 
    
    }; 

const logout = async (req, res) => {
        // Le token est déjà vérifié par le middleware
    res.status(200).json({ message: 'Logout successful' });
};

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const updateProfile = async (req, res) => {
    // Valider les données de la requête
    const { error } = validateUpdateUser(req.body);
    if (error) {
        return res.status(400).send({ message: error.details[0].message });
    }

    try {
        const userId = req.user.id;

        // Exclure le mot de passe des données de mise à jour
        const { password, ...updateData } = req.body;

        // Mettre à jour l'utilisateur avec les nouvelles données
        const user = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).send({ error: 'User not found!' });
        }

        // Ne pas renvoyer le mot de passe dans la réponse
        const { password: userPassword, ...other } = user.toObject();
        res.status(200).json(other);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
 
module.exports = {registerUser, login, logout, getProfile, updateProfile };

