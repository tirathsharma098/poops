
const AppError = require('../utilities/AppError');
const wrapAsync = require('../utilities/WrapAsync');
const {PortalItem} = require('../models/PortalItem');
const {ReviewPortal} = require('../models/PortalReviews');

// Displaying particular portal
exports.displayDetail = wrapAsync( async (req, res) => {
    let portalID;  
    //console.log("1Docid : " ,req.body.portalID ,"1session id : ", req.session.portalID);
    if(req.body.portalID){
      portalID = req.body.portalID;
    }else if(req.session.portalID){
      portalID = req.session.portalID;
      delete req.session.portalID;
    }
    //console.log('Portal Id : ', portalID)
    if(!portalID){
      throw new AppError('1.To See Details of portals you should follow the links, not Mess thing Up', 400);
    }
    const portalDetails = await (await PortalItem.findById(portalID)).populate('admin');
    const allReviews = await ReviewPortal.find({portal:portalID}).populate('admin');
    if(!portalDetails){
      throw new AppError('2.To See Details of portals you should follow the links, not Mess thing Up', 400);
    }
    res.render('portals/showDetails.ejs', {portalDetails, allReviews});
  })

  exports.editPortalPut = wrapAsync( async(req, res) => {
    const {portalAbout, portalImage, portalPrice, portalAddress, portalID} = req.body;
  
    if(!portalAbout || !portalImage || !portalPrice || !portalAddress){
      throw new AppError('Some data is missing While Editing Portal', 400);
    }
    const portalDoc = await PortalItem.findById(portalID);
    if(!portalDoc){
      throw new AppError('You may be not following the links pattern therefore some unexpected happened while editing portal', 400);
    }
    const updatedDoc = await PortalItem.findByIdAndUpdate(portalID, {portalAbout: portalAbout, portalImage: portalImage, portalPrice: portalPrice, "portalAddress.street": portalAddress.street}, {runValidators: true}).then(d=>{req.flash('actionResponse', "Portal Edited SuccessFully ):")})
    //console.log('Updated Doc : ', updatedDoc);
    res.redirect(307, '/portals/details');
  })

  exports.deletePortal = wrapAsync( async(req, res) => {
    const {portalID} = req.body;
    const portalDoc = await PortalItem.findById(portalID);
    if(!portalDoc) throw new AppError("Something Went Wrong While Deleting Portal", 400);
    const deletedPortal = await PortalItem.findByIdAndDelete(portalID);
    //console.log('Portal Deleted Successfully : ', deletedPortal);
    req.flash('actionResponse', "Portal Deleted Successfully");
    res.redirect(307,'/portals/show');
  })

  exports.editPortalPost = wrapAsync( async(req, res) => {
    const {portalID} = req.body;
    const portalDoc = await PortalItem.findById(portalID);
    if(!portalDoc){
      throw new AppError('Portal Validation Failed, Please try again later', 400);
    }
    res.render('portals/editPortals.ejs', {portalDoc});
  } )