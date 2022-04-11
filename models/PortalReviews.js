const mongoose = require('mongoose');
const { Schema, model} = mongoose;

const reviewSchema = new Schema({
    review :  {
        type: String,
        required: true
    },
    admin : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    rating :  {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    portal : {
        type : Schema.Types.ObjectId,
        ref : 'PortalItem'
    }
})

const ReviewPortal = model('ReviewPortal', reviewSchema);

exports.ReviewPortal = ReviewPortal;