const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../middleware/auth')
//register route
router.post('/register', [
    check('name', "name is required")
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email address').isEmail(),
    check('password', "Please enter a password with 6 or more characters").isLength({ min: 6 }),
    check("username", "Enter  username").isLength({ min: 0 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    let { name, email, password, username } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] })
        };
        user = new User({
            name,
            email,
            username,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");

    }
})

//get user
router.get('/auth', auth, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json("Server error")

    }
})

//authenticate route
router.post('/login', [
    check("email", "Enter a valid email.").isEmail(),
    check("password", "Password is required").exists()
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (err) {
        console.log(err.message);
        res.status(500).send("server error");
    }
})
//Profile route
router.get('/profile', (req, res, next) => {
    res.send("profile");
})

module.exports = router