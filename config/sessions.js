const expressSession = require('express-session');
const mongodbStore = require('connect-mongodb-session');


function createSessionStore() {
    const MongoDBStore = mongodbStore(expressSession);
    const sessionStore = new MongoDBStore({
        uri: 'mongodb://localhost:27017',
        databaseName: 'online-shop',
        collection: 'sessions'
    });
    return sessionStore
};

function createSessionConfig() {
    return {
    secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000  /* = 2 jours */
    }
  };
};

module.exports = {
    createSessionConfig : createSessionConfig
};