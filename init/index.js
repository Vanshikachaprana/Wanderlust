require("dotenv").config();
const mongoose = require("mongoose");

const initData = require("./data.js");
const Listing = require("../Models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});

  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6ac263bb4cf83c1764781ff3",
  }));

  await Listing.insertMany(initData.data);

  console.log("data saved successfully");
};

initDB();