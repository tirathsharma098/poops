const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const {ReviewPortal} = require('./PortalReviews');
const AppError = require('../utilities/AppError');

const itemSchema = new Schema({
    portalName : {
        type: String,
        required: true
    },
    admin : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    portalAbout : {
        type: String,
        required: true
    },
    portalImage : {
        type: String
    },
    portalPrice : {
        type: Number,
        required: true,
        min: 0,
        max: 999
    },
    portalAddress : {
        street : {
            type: String,
            required: true
        },
        city : {
            type: String,
            required: true
        },
        state : {
            type: String,
            required: true
        },
        country: {
            type: String,
            
        }
    }
})

itemSchema.post('findOneAndDelete', async function(doc, next){
    //console.log('Deleted doc we got : ', doc);
    if(!doc){
        throw new AppError("Sommething went wrong while Deleting Associated Reviews");
    }
    const response = await ReviewPortal.deleteMany({portal : doc._id});
    console.log(response);
    next();
})

const PortalItem = model('PortalItem', itemSchema);

exports.PortalItem = PortalItem;