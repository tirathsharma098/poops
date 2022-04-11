const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const allPublicPortals = [
    "Water Portals",
    "Public Toilets",
    "Roads and Transport",
    "Bus Stations",
    "Railway Stations"
];

const portalSchema = new Schema({
    portalName: String,
    portalAbout: String,
    portalImage: String
})

const Portal = model('Portal', portalSchema);

exports.Portal = Portal;
exports.allPublicPortals = allPublicPortals;