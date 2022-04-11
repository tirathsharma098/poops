const mongoose = require('mongoose');
const {Portal} = require('./models/Portal');

main().catch(err => console.log(err, 'Error Occurred While Connecting to DB'));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/poops');
  console.log('Connected to database Successfully');
}

async function createPortals(){
    await Portal.insertMany([
        {portalName: "Water Portals", portalAbout: 'May be you are thirsty search water portals near you.', portalImage: 'https://www.amnh.org/var/ezflow_site/storage/images/media/amnh/images/explore/ology-images/water/what-is-water/carousel-hero-what-is-water/5268960-1-eng-US/carousel-hero-what-is-water_facebookshare_1200.jpg'},
        {portalName: "Public Toilets", portalAbout: 'Having a tight preasure, view washrooms near you quickly.', portalImage: 'https://cdn.theculturetrip.com/wp-content/uploads/2017/07/public-toilet-1024x768.jpg'},
        {portalName: "Roads and Transport", portalAbout: 'Wana complain about Roads and Transport, so lets get in', portalImage: 'https://www.teriin.org/sites/default/files/inline-images/highways.jpg'},
        {portalName: "Bus Stations", portalAbout: 'Have any problem with the Bus stations, Your query not resolved or did not find an facility', portalImage: 'https://trythistravel.files.wordpress.com/2014/07/img_7028.jpg'},
        {portalName: "Railway Stations", portalAbout: 'Come on, Give some feedback about railway stations', portalImage: 'https://images.newindianexpress.com/uploads/user/imagelibrary/2022/1/13/w900X450/Sir-M-Visvesvaraya-terminal.jpg?w=400&dpr=2.6'}
    ]).then(d => console.log('Data added successfully', d)).catch(e=> console.log('An Error occured',e))
}

createPortals();