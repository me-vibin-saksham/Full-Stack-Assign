const User = require('../models/userModel');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const bcryptSalt = bcryptjs.genSaltSync(10);
const jwtSalt = "csbajkhbdjhcbaskchabkchsdcvsgdvbhasckajhc";  


const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Register User...");
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcryptjs.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(422).json(e);
    }
};


const login = async (req, res) => {
    console.log("Login Request..");
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    
    if (userDoc) {
        const passCheck = bcryptjs.compareSync(password, userDoc.password);
        if (passCheck) {
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSalt, { expiresIn: '1h' }, (err, token) => {
                if (err) return res.status(500).json({ error: 'JWT token generation failed' });
                res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' }).json("password ok");
            });
        } else {
            res.status(422).json("password incorrect");
        }
    } else {
        res.status(404).json("User not found");
    }
};

module.exports = {
    register,
    login,
};
