const Listing =require("../Models/listing.js");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });


//Index Route
module.exports.index = async (req,res)=>{
  const allListings= await Listing.find({});
  res.render("listings/index",{allListings});

};

//New
module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
};

//Show
module.exports.showListing =  async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author", 
            },
        })
        .populate("owner"); 

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};

//Create Route
module.exports.createNewListing = async (req,res,next)=>{
   let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1
})
  .send()
 


    let url= req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    newListing.geometry = response.body.features[0].geometry;
    let saved = await newListing.save();
    console.log(saved);
        req.flash("success", "New listing created!!");
    res.redirect("/listings");
};

//Edit Route
module.exports.editListing =  async (req,res)=>{
     let {id} = req.params;
     const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested for doesn't exist!!");
         return res.redirect("/listings");
     }
     let originalImage =listing.image.url;
    originalImage = originalImage.replace(
    "/upload",
    "/upload/q_auto:low,h_300,w_250"
     );
     res.render("listings/edit.ejs",{listing, originalImage});
};

//Update Route
module.exports.updateListing =  async (req,res)=>{
    let {id} = req.params;
     let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
         let url= req.file.path;
         let filename = req.file.filename;
         listing.image= {url,filename};
         await listing.save();
    }
         req.flash("success", "Listing updated!!");
        res.redirect(`/listings/${id}`);      //To redirect the updated data on the given URL
};

//Delete Route
module.exports.deleteListing =  async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
            req.flash("success", "Listing Deleted!!");

    res.redirect("/listings");
};
