function createUserSession(req, user, action) {
    console.log('user',user)
    req.session.uid = user._id.toString();
    req.session.save(action);
}

module.exports = {
    createUserSession: createUserSession
};