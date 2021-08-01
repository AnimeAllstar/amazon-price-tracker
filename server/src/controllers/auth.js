const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.authUser = async (req, res) => {
  mongoose.set('useFindAndModify', false);
  const data = await User.findOneAndUpdate({}, { name: req.body.name, email: req.body.email }, { upsert: true });
  res.json(data);
};
