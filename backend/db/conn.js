const { MongoClient } = require("mongodb");
const Db = process.env.MONGODB_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = {
  connectToServer: function () {
    client
      .connect()
      .then(() => {
        console.log("Successfully connected to MongoDB.");
      })
      .catch((err) => {
        console.log(`db error ${err.message}`);
        process.exit(-1);
      });
  },

  getDb: function () {
    return client.db("fasa");
  },
};
