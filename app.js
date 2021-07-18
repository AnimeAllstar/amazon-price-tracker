const express = require('express');
const app = express();
const routes = require('./src/routes/routes');
const nunjucks = require('nunjucks');

const port = 3000;

nunjucks.configure('src/views', {
    autoescape: true,
    express: app
});

app.use(routes);

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});