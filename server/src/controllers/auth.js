const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.authUser = async (req, res) => {
  mongoose.set('useFindAndModify', false);
  const query = { email: req.body.email };
  const update = { name: req.body.name, email: req.body.email };
  const data = await User.findOneAndUpdate(query, update, { upsert: true });
  res.json(data);
};
