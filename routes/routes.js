const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/model');

const router = express.Router();

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Signup successful',
            user: req.user,
        });
    }
);

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                const error = new Error('An error occurred.');
                return next(info);
            }

            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);

                const body = {
                    _id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    role: user.role,
                    status: user.status,
                    place: user.place,
                };
                const token = jwt.sign({ user: body }, 'supersecret');

                return res.json({ token });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

// Check if email is in the DB, and sends a link to the mail for resetting password
router.post('/resetpassword', (req, res) => {
    let emailToFind = req.query.emailToFind;
    let emails = [];
    UserModel.find({})
        .select('email')
        .then((users) => {
            users.forEach(user => {
                emails.push(user.email)
            })
            if (emails.includes(emailToFind)) {
                res.status(200).json(`Link for resetting password has been sendt to ${emailToFind}`);
            } else {
                res.status(400).json('Email not found!')
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
})

module.exports = router;
