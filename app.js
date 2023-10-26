const path = require('path');

const express = require('express');
const expressSession = require('express-session');

const csrf = require('csurf');

const session = require('./config/sessions');
const db = require('./data/database');
const authRoutes = require('./routes/auth.routes');
const CSRFTokenMiddleware = require('./middlewares/csrf.token.middleware');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false })); /* gere les data qui sont en piece jointes des requetes*/

const sessionConfig = session.createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(CSRFTokenMiddleware);

app.use(authRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
.then(function() {
    app.listen(3000);
})
.catch(function(error) {
    console.log('Failed to connect to the database!');
    console.log(error);
});