const express = require("express");
const router = express.Router(); // Create an Express Router to handle listing-related routes separately
const wrapAsync = require("../utils/wrapAsync.js");
const Listing =require("../Models/listing.js");
const listingController = require("../Controllers/listing.js");
const {isLoggedin, isOwner ,validateListing} = require("../middleware.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage });


//New Route
router.get("/new",isLoggedin,listingController.renderNewForm);

 //Using ROUTER>ROUTE
router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedin,
    validateListing,
    upload.single("listing[image]"), 
     wrapAsync(listingController.createNewListing)
    );



//Edit Route
router.get("/:id/edit", isLoggedin,isOwner,
   wrapAsync(listingController.editListing));


//using ROUTER.ROUTE--------------------------------------------------
router.route("/:id")
.get(wrapAsync(listingController.showListing))

.put(isLoggedin,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
   wrapAsync(listingController.updateListing))

.delete(isLoggedin, isOwner,
    wrapAsync(listingController.deleteListing));


module.exports = router;

   //Index Route
// router.route("/")
// .get(wrapAsync(listingController.index))

//Create Route
// router.post("/",isLoggedin,validateListing,
//      wrapAsync(listingController.createNewListing));

    // Show Route
// router.get("/:id",wrapAsync(listingController.showListing));

//Update Route
// router.put("/:id",isLoggedin,isOwner, validateListing,
//    wrapAsync(listingController.updateListing));

//DELETE Route
// router.delete("/:id",isLoggedin, isOwner,
//     wrapAsync(listingController.deleteListing));



