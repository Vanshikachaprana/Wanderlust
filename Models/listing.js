const mongoose =require("mongoose");
const Schema = mongoose.Schema;

const listingSchema =new Schema({
    title :{
      type : String,
      required : true,
    },
    description : String,
    image : {
      url:{
         type : String,
        default :"https://www.zdnet.com/a/img/resize/a61dfc03766f047bbfd9c01cd2be0abe88025065/2019/09/05/7c148e17-3f7e-4166-b755-324799ba0c7a/atanas-malamov-tpmav6c33de-unsplash.jpg?auto=webp&fit=crop&height=1200&width=1200",
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
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports =Listing;