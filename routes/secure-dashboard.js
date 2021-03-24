const express = require('express');
const router = express.Router();
const UserModel = require('../model/model');

// get all users, if email is in query - find that person
router.get('/', (req, res, next) => {
    let emailToFind = req.query.emailToFind;

    if (emailToFind) {
        UserModel.find({ email: emailToFind })
            .select('name surname status place role')
            .then((users) => {
                res.status(200).json(users);
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    } else {
        UserModel.find({})
        .select('name surname status place role')
        .then((users) => {
            res.status(200).json(users);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
    }
    
});

module.exports = router;
