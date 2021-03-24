const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const port = 3000;
const UserModel = require('./model/model');

require('./auth/auth');
const routes = require('./routes/routes');
const secureUserProfile = require('./routes/secure-user-profile');
const secureDashboard = require('./routes/secure-dashboard');
const secureLogout = require('./routes/secure-logout');

app.use(express.json());

app.use('/', routes);

app.use(
    '/user',
    passport.authenticate('jwt', { session: false }),
    secureUserProfile
);

app.use(
    '/dashboard',
    passport.authenticate('jwt', { session: false }),
    secureDashboard
);

app.use(
    '/logout',
    passport.authenticate('jwt', { session: false }),
    secureLogout
);

//Database
mongoose.connect('mongodb://localhost:27017/users-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

const db = mongoose.connection;

// Handle errors.
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err });
});

db.on('error', () => {
    console.log('Error connecting to the database!!!!');
});
db.on('open', () => {
    console.log('We have connection to the database =)');
});
app.listen(port, () =>
    console.log(`Express server listening on port ${port}...`)
);
