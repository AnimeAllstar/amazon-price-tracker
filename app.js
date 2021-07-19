const express = require('express');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./src/routes/routes');
const jobs = require('./src/utils/jobs');

const port = 3000;
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
        app.listen(port, () => {
            console.log(`listening at http://localhost:${port}`);
            jobs.start();
        });
    } catch (err) {
        console.log(err);
    }
})();