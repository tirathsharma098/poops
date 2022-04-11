const Joi = require('joi');
const AppError = require('./utilities/AppError');

exports.validatePortalItem = (req, res, next) => {
    const portalItemSchema = Joi.object({
        portalName : Joi.string().min(3).max(100).required(),
        portalAbout : Joi.string().min(3).max(2000).required(),
        portalImage : Joi.string().min(3).max(500),
        portalPrice : Joi.number().min(0).max(999).required(),
        portalAddress : Joi.object({
            street : Joi.string().min(5).max(200).required(),
            city : Joi.string().min(2).max(100).required(),
            state : Joi.string().min(2).max(200).required(),
            country : Joi.string().min(2).max(200).required()
        })
    }).required()

    const {error} = portalItemSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    }else{
        return next();
    }
}


exports.validateShowPortalItem = (req, res, next) => {
    const showPortalSchema = Joi.object({
        portalID : Joi.string(),
        portalName : Joi.string().min(3).max(100).required(),
        portalAbout : Joi.string(),
        portalImage : Joi.string(),
        portalPrice : Joi.number(),
        portalAddress : Joi.object({
            street : Joi.string(),
            country : Joi.string().required(),
            city : Joi.string().min(2).max(100).required(),
            state : Joi.string().min(2).max(200).required()
        })
    }).required();

    const {error, value} = showPortalSchema.validate(req.body);
    //console.log(error);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    }else{
        return next();
    }
}

exports.validateReviewItem = (req, res, next) => {
    const reviewSchema = Joi.object({
        portalID : Joi.required(),
        rating : Joi.number().min(1).max(5).required().integer(),
        review : Joi.string().min(5).max(2000).required()
    }).required()

    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    }
    return next();
}


exports.validateEditPortal = (req, res, next) => {
    const editPortalSchema = Joi.object({
        portalID : Joi.required(),
        portalAbout : Joi.string().min(3).max(2000).required(),
        portalImage : Joi.string().min(3).max(500),
        portalPrice : Joi.number().min(0).max(999).required(),
        portalAddress : Joi.object({
            street : Joi.string().min(5).max(200).required()
        })

    }).required()

    const {error} = editPortalSchema.validate(req.body);
    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new AppError(msg, 400);
    }
    return next();
}
