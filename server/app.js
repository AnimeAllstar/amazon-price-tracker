const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./src/routes/product');
const errorController = require('./src/controllers/error');

const jobs = require('./src/utils/jobs');

const app = express();

app.use(cors());

app.use(productRoutes);

// request reaches here if none of the routes in appRoutes is matched
app.use(errorController.notFound);

(async () => {
  try {
    console.log('Connecting to database');
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected!');
    app.listen(process.env.PORT || 8080, () => {
      console.log('listening on ' + (process.env.PORT ? `port ${process.env.PORT}` : 'http://localhost:8080/'));
      jobs.start();
    });
  } catch (err) {
    console.log(err);
  }
})();
