function getSessionData(req) {
    const sessionData = req.session.flashedData;
    req.session.flashedData = null;
    return sessionData;
}; /* crée le flashedData comme étant de base null*/

function flashDataToSessions(req, data, action) {
req.session.flashedData = data;
req.session.save(action);
};

module.exports = {
    getSessionData: getSessionData,
    flashDataToSessions: flashDataToSessions
}