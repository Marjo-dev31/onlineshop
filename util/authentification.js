function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.sessions.isAdmin = user.isAdmin;
    req.session.save(action);
}

module.exports = {
    createUserSession: createUserSession
};