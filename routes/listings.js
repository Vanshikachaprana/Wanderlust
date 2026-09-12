const express = require("express");
const router = express.Router(); // Create an Express Router to handle listing-related routes separately
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing =require("../Models/listing.js");
const {isLoggedin} = require("../middleware.js")




const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }
}

//Index Route
router.get("/",
    wrapAsync(async (req,res)=>{
  const allListings= await Listing.find({});
  res.render("listings/index",{allListings});

}));

//New Route
router.get("/new",isLoggedin,(req,res)=>{
    res.render("listings/new.ejs");
});

//Show Route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
     const listing = await Listing.findById(id).populate("reviews");
     if(!listing){
        req.flash("error","Listing you requested for doesn't exist!!");
         return res.redirect("/listings");
     }
     res.render("listings/show",{listing});
}));

//Create Route

router.post("/",
    isLoggedin,
    validateListing,
     wrapAsync(async (req,res,next)=>{

    const newListing = new Listing(req.body.listing);
    await newListing.save();
        req.flash("success", "New listing created!!");
    res.redirect("/listings");
}));


//Edit Route
router.get("/:id/edit", isLoggedin, wrapAsync(async (req,res)=>{
     let {id} = req.params;
     const listing = await Listing.findById(id);
     if(!listing){
        req.flash("error","Listing you requested for doesn't exist!!");
         return res.redirect("/listings");
     }
     res.render("listings/edit.ejs",{listing});
}));


//Update Route
router.put("/:id",
    isLoggedin,
    validateListing,
    wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
            req.flash("success", "Listing updated!!");

    res.redirect(`/listings/${id}`);      //To redirect the updated data on the given URL
}));

//DELETE Route
router.delete("/:id",isLoggedin, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
            req.flash("success", "Listing Deleted!!");

    res.redirect("/listings");
}));



module.exports = router;