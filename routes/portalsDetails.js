const express = require('express');
const router = express.Router();
const { validateEditPortal} = require('../validateSchema');
const {validateUser} = require('../middlewares')

const {displayDetail, editPortalPut, deletePortal, editPortalPost} = require('../controllers/portalsDetails');


router.route('/edit')
  .post(validateUser ,editPortalPost)

router.route('/')
  .post(displayDetail)
  .put(validateUser, validateEditPortal, editPortalPut)
  .delete(validateUser, deletePortal)


  module.exports = router;