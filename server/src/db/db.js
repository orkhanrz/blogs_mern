const mongoose = require("mongoose");
let _db = null;

module.exports = {
  init: async (cb) => {
    try {
      _db = await mongoose.connect(process.env.MONGODB_URI, { dbName: "blogs" });
      console.log('Connection initialized!')
      cb();
    } catch (err) {
      throw new Error(err);
    }
  },
  getDb: () => {
    return _db;
  },
};
