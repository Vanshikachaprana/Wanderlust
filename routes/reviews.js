const express = require("express");
const router = express.Router({ mergeParams: true });// mergeParams: true allows the router to access parameters from the parent route
const Listing =require("../Models/listing.js");
const Review = require("../Models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin ,validateReview,isReviewAuthor} = require("../middleware.js")
const reviewController = require("../Controllers/review.js");


//REVIEW ----------------------------------------
//POST ROUTE
router.post("/", isLoggedin, validateReview ,
    wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId" ,
    isLoggedin ,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview));


module.exports = router;
