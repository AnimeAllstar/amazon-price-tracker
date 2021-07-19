const express = require('express');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./src/routes/routes');
const productRoutes = require('./src/routes/product');
const errorController = require('./src/controllers/error');

const jobs = require('./src/utils/jobs');

const app = express();

app.use(express.static('public'));

// nunjucks is the templating engine
nunjucks.configure('src/views', {
    autoescape: true,
    express: app,
});

app.use(routes);
app.use(productRoutes);

// request reaches here if none of the routes in appRoutes is matched
app.use(errorController.render404);

(async () => {
    try {
        console.log('Connecting to database');
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected!');
        app.listen(process.env.PORT || 3000, () => {
            console.log('listening on ' + (process.env.PORT ? `port ${process.env.PORT}` : 'http://localhost:3000/'));
            jobs.start();
        });
    } catch (err) {
        console.log(err);
    }
})();