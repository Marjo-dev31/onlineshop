const path = require('path');

const express = require('express');
const expressSession = require('express-session');

const csrf = require('csurf');

const session = require('./config/sessions');
const db = require('./data/database');
const CSRFTokenMiddleware = require('./middlewares/csrf.token.middleware');
const errorHandlerMiddleware = require('./middlewares/error-handler');
const checkAuthStatusMiddleware = require('./middlewares/check-auth');
const protectRoutesMiddleware = require('./middlewares/protect-routes');

const cartMiddleware= require('./middlewares/cart')
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const baseRoutes = require('./routes/bases.routes');
const adminRoutes = require('./routes/admin.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/orders.routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/products/assests',express.static('product-data'));
app.use(express.urlencoded({ extended: false })); /* gere les data qui sont en piece jointes des requetes*/
app.use(express.json());

const sessionConfig = session.createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(cartMiddleware);

app.use(CSRFTokenMiddleware);
app.use(checkAuthStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use('/cart', cartRoutes);

app.use(protectRoutesMiddleware);
app.use('/order', orderRoutes);
app.use('/admin', adminRoutes);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
.then(function() {
    app.listen(3000);
})
.catch(function(error) {
    console.log('Failed to connect to the database!');
    console.log(error);
});