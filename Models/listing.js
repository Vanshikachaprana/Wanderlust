const mongoose =require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema =new Schema({
    title :{
      type : String,
      required : true,
    },
    description : String,
    image : {
      url:{
         type : String,
        default :"https://img.magnific.com/free-photo/beautiful-sunset-scene_23-2151892420.jpg?semt=ais_hybrid&w=740&q=80",
      },
      filename: {
          type: String,
          default: "listingimage"
  }
       
        // set : (v) =>
        //      v === "" 
        //     ? "https://www.zdnet.com/a/img/resize/a61dfc03766f047bbfd9c01cd2be0abe88025065/2019/09/05/7c148e17-3f7e-4166-b755-324799ba0c7a/atanas-malamov-tpmav6c33de-unsplash.jpg?auto=webp&fit=crop&height=1200&width=1200" 
        //     : v,
    },
    price : Number,
    location : String,
    country : String,
    reviews :[
      {
        type : Schema.Types.ObjectId,
       ref: "Review"
      }
    ],
    owner :{
      type : Schema.Types.ObjectId,
      ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
  if(listing){
  await Review.deleteMany({_id : {$in : listing.reviews}});

  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports =Listing;