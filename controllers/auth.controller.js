const User = require('../models/user.model');
const authUtil = require('../util/authentification');
const validation = require('../util/validation');
const sessionFlashed = require('../util/session-flash');

function getSignup(req, res) {
    res.render('customer/auth/signup')
};

async function signup(req, res, next) {
    // if (!res.locals.isAuth) {
    //     return res.status('401').render('401');
    // };
    const enteredData = {
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city
    };

    if (!validation.userIsValid(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city)
        || validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
    ) {
        sessionFlashed.flashDataToSessions(req, {
            errorMessage: 'Please check you input',
            ...enteredData
        }, function () {
            res.redirect('/signup');
        });
        return;
    };

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    );

    try {
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            sessionFlashed.flashDataToSessions(req, {
                errorMessage: 'User exist already!',
                ...enteredData, /*les ...permet de utiliser les toutes les key d un objet*/
            }, function () {
                res.redirect('/signup');
            })
            return;
        };
        await user.signup();
    } catch (error) {
        next(error);
        return;
    };

    res.redirect('/login');
};


function getLogin(req, res) {
    res.render('customer/auth/login')
};

async function login(req, res, next) {
    const user = new User(req.body.email, req.body.password);

    let existingUser;

    try {
        existingUser = await user.getUserWithSameEmail();
    } catch (error) {
        next(error);
        return;
    }

    const sessionErrorData = {
        errorMessage: 'Invalid credentials - please check your email and password',
        email: user.email,
        passwword: user.password
    };

    if (!existingUser) {
        sessionFlashed.flashDataToSessions(req, sessionErrorData, function() {
            res.redirect('/login');
        });
        return;
    };

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

    if (!passwordIsCorrect) {
        sessionFlashed.flashDataToSessions(req, sessionErrorData, function() {
            res.redirect('/login');
        });
        return;
    };

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect('/');
    });

};


function logout(req, res) {
    req.session.uid = null;
    // req.session.isAuth = false;

    res.redirect('/login');
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout
};