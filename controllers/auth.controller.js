const User = require('../models/user.model');
const authUtil = require('../util/authentification');
const validation = require('../util/validation');

function getSignup(req, res) {
    res.render('customer/auth/signup')
};

async function signup(req, res, next) {
    // if (!res.locals.isAuth) {
    //     return res.status('401').render('401');
    // };

    if (!validation.userIsValid(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city)
        || validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
    ) {
        res.redirect('/signup');
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

    if(existsAlready) {
        res.redirect('/signup');
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

    if (!existingUser) {
        console.log('email incorrect')
        res.redirect('/login');
        return;
    };

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

    if (!passwordIsCorrect) {
        console.log('password incorrect')
        res.redirect('/login');
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