const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../Models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
 .then(()=>{
    console.log("connected to DB");
 })
 .catch((err)=>{
    console.log(err);
 })
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=>({
      ...obj,
      owner : "6aa634618f2204e65ddc658a",
   }))
   await Listing.insertMany(initData.data);
   console.log("data saved successful");
};

initDB();