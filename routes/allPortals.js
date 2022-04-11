const express = require('express');
const router = express.Router();
const {Portal, allPublicPortals} = require('../models/Portal');
const {validatePortalItem , validateShowPortalItem} = require('../validateSchema');
const allCountryArray = require('../data/allCountryArray');
const AppError = require('../utilities/AppError');
const wrapAsync = require('../utilities/WrapAsync');
const {PortalItem} = require('../models/PortalItem');
const {validateUser} = require('../middlewares');

//  Creating portal
router.get('/create', validateUser, (req, res) => {
    res.render('portals/createPortals',{allPublicPortals, allCountryArray});
})
  
router.post('/create', validateUser, validatePortalItem ,wrapAsync(async (req, res) => {
const doc = new PortalItem(req.body);
doc.admin = req.user._id;
if(!doc || !req.user._id){
    throw new AppError('Something Went Wrong, Data is not able to insert.');
}
await doc.save().then(d=>{req.flash('actionResponse', 'Your Portal is created Successfully.')});
delete req.session.portalID;
req.session.portalID = doc._id;

res.redirect(307 ,'/portals/details');
}))

//  searching portals
router.post('/search', wrapAsync(async (req, res) => {
const {portalName} = req.body;
const response = await Portal.findOne({portalName: portalName});
if(response){
    return res.render('portals/searchPortals',{allCountryArray, portalName});
}

res.redirect('/');
}))

// showing Portals

router.post('/show', validateShowPortalItem, wrapAsync( async (req, res) => {
const{portalName, portalAddress} = req.body;
const releventPortals = await PortalItem.find({portalName:portalName, "portalAddress.city" : portalAddress.city, "portalAddress.state": portalAddress.state});
if(!releventPortals.length){
    throw new AppError('There is not a single portal exist for this location. You can Create One Portal if you want, to create new one click on create new link above.', 200);
}else if(releventPortals){
    //console.log(releventPortals);
    return res.render('portals/showPortals.ejs', {releventPortals});
}
throw new AppError('You Should follow links so that get into right page', 400);
}))

module.exports = router;