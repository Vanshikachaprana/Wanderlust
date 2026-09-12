const express = require("express");
const router = express.Router({ mergeParams: true });// mergeParams: true allows the router to access parameters from the parent route
const Listing =require("../Models/listing.js");
const Review = require("../Models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema} = require("../schema.js");
const {isLoggedin} = require("../middleware.js")





const validateReview = (req,res,next)=>{
    let {error} =reviewSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400 , errMsg);
    }else{
        next();
    }
}


//REVIEW ----------------------------------------
//POST ROUTE
router.post("/", isLoggedin, validateReview ,wrapAsync(async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
            req.flash("success", "New Review Created!!");


    res.redirect(`/listings/${listing._id}`);
}));

//Delete Review Route
router.delete("/:reviewId" ,isLoggedin , wrapAsync(async(req,res)=>{
    let{id, reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
            req.flash("success", "Review Deleted!!");

    res.redirect(`/listings/${id}`);
}));


module.exports = router;
