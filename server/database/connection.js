const mongoose = require("mongoose");

const connection = () => {
  const dbConStr = process.env.MONGO_DB_URI;

  mongoose.set("strictQuery", false);
  mongoose
    .connect(dbConStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DATABASE CONNECTED..!!");
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = { connection };
