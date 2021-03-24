const express = require('express');
const router = express.Router();
const UserModel = require('../model/model');
const bcrypt = require('bcrypt');

router.get('/', (req, res, next) => {
    res.json({
        message: 'This is your user profile!',
        user: req.user,
        token: req.query.secret_token,
    });
});

// Update user, only teachers can update more than role and status
router.patch('/', (req, res) => {

    let emailToFind = req.query.emailToFind;

    // All users can change these
    let newStatus = req.body.newStatus;
    let newPlace = req.body.newPlace;

    // Only teacher can change these
    let newName = req.body.newName;
    let newSurname = req.body.newSurname;
    let newEmail = req.body.newEmail;
    let newRole = req.body.newRole;

    if (newStatus) {
        UserModel.findOneAndUpdate(
            { email: emailToFind },
            { status: newStatus }
        )
            .then(() =>
                res
                    .status(200)
                    .json(
                        `The status of ${emailToFind} has changed to ${newStatus}`
                    )
            )
            .catch((error) => res.status(500).json(error));
    } else if (newPlace) {
        UserModel.findOneAndUpdate(
            { email: emailToFind },
            { place: newPlace }
        )
            .then(() =>
                res
                    .status(200)
                    .json(
                        `The place of ${emailToFind} has changed to ${newPlace}`
                    )
            )
            .catch((error) => res.status(500).json(error));
    } else if (newName) {
        if (req.user.role === 'teacher') {
            UserModel.findOneAndUpdate(
                { email: emailToFind },
                { name: newName }
            )
                .then(() =>
                    res
                        .status(200)
                        .json(
                            `The name of ${emailToFind} has changed to ${newName}`
                        )
                )
                .catch((error) => res.status(500).json(error));
        } else {
            res.status(401).json('You dont have permission to update user')
        }
    } else if (newSurname) {
        if (req.user.role === 'teacher') {
            UserModel.findOneAndUpdate(
                { email: emailToFind },
                { surname: newSurname }
            )
                .then(() =>
                    res
                        .status(200)
                        .json(
                            `The surname of ${emailToFind} has changed to ${newSurname}`
                        )
                )
                .catch((error) => res.status(500).json(error));
        } else {
            res.status(401).json('You dont have permission to update user')
        }
    } else if (newEmail) {
        if (req.user.role === 'teacher') {
            UserModel.findOneAndUpdate(
                { email: emailToFind },
                { email: newEmail }
            )
                .then(() =>
                    res
                        .status(200)
                        .json(
                            `The email of ${emailToFind} has changed to ${newEmail}`
                        )
                )
                .catch((error) => res.status(500).json(error));
        } else {
            res.status(401).json('You dont have permission to update user')
        }
    } else if (newRole) {
        if (req.user.role === 'teacher') {
            UserModel.findOneAndUpdate(
                { email: emailToFind },
                { role: newRole }
            )
                .then(() =>
                    res
                        .status(200)
                        .json(
                            `The role of ${emailToFind} has changed to ${newRole}`
                        )
                )
                .catch((error) => res.status(500).json(error));
        } else {
            res.status(401).json('You dont have permission to update user')
        }
    }
});

module.exports = router;
