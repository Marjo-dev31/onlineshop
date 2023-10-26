function createUserSession(req, res, action) {
    req.session.uid = user._id.toString();
    req.session.save(action);
}

module.exports = {
    createUserSession: createUserSession
};