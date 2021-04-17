const mongoose = require('mongoose');

exports.connect = async ()  => {
    try {
      mongoose.Promise = global.Promise;
      await mongoose.connect(process.env.ATLAS_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
    } catch (err) {
      console.log('Mongoose error', err);
    }
  }
