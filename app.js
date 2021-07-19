const express = require('express');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./src/routes/routes');
const jobs = require('./src/utils/jobs');

const app = express();

nunjucks.configure('src/views', {
    autoescape: true,
    express: app,
});

app.use(routes);

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