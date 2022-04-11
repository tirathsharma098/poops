const express = require('express');
const router = express.Router();
const AppError = require('../utilities/AppError');
const wrapAsync = require('../utilities/WrapAsync');
const {Portal} = require('../models/Portal');

// Homepage route is here
router.get('/', wrapAsync(async (req, res) => {
    const allPortals = await Portal.find({});
    if(!allPortals){
      throw new AppError('Portals Not Found Right Now please Try Again Later', 500);
    }
    res.render('portals/home.ejs', {allPortals});
  }))

module.exports = router;