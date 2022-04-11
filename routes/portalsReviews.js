const express = require('express');
const router = express.Router();
const { validateReviewItem} = require('../validateSchema');
const AppError = require('../utilities/AppError');
const wrapAsync = require('../utilities/WrapAsync');
const {PortalItem} = require('../models/PortalItem');
const {ReviewPortal} = require('../models/PortalReviews');
const {validateUser} = require('../middlewares');

// Making Review for particular portal

router.post('/', validateUser, validateReviewItem, wrapAsync( async (req, res) => {
    const {review, rating, portalID} = req.body;
    const portalDoc = await PortalItem.findById(portalID);
    if(!portalDoc){
      throw new AppError('Review couldt added, you should follow the links, not Mess thing Up', 400);
    }
    const reviewDoc = new ReviewPortal({review:review, rating:rating});
    reviewDoc.admin = req.user._id;
    reviewDoc.portal = portalDoc;
    await reviewDoc.save().then(d=>{req.flash('actionResponse', "Review Added SuccessFully ):")});
    res.redirect(307, '/portals/details');
}))

// DELETING Review of particular portal

router.delete('/', validateUser, wrapAsync( async(req, res) => {
const {reviewID} = req.body;
const reviewItem = await ReviewPortal.findById(reviewID);
if(!reviewItem){
    throw new AppError('Something Went wrong, validation Failed', 400);
}
if(!reviewItem.admin.equals(req.user._id)){
    req.flash('error', 'Something went Wrong!');
    res.redirect(307, '/portals/details');
}
const reviewDeleted = await ReviewPortal.findByIdAndDelete(reviewID)
if(reviewDeleted){
    req.flash('actionResponse', 'Review Deleted Successfully!');
    res.redirect(307, '/portals/details');
}else{
    throw new AppError('Something UnExpected Happens, Please try later');
}

}))

  
module.exports = router;