const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    Username:{
        type:String,
        required:true
    },
   Carname:{
        type:String,
        required:true
    },
    Model:{
        type:String,
        required:true
    },
    DrivingLicences:{
        type:Object,
        required:true
    },
    img: 
    {
        type:String,
        required:true
    },
  
    
    phone:{
        type:String,
        required:true
    },
    ActiveStatus:{
        type:String,
        required:true
    },



});
const onoffline = mongoose.Schema({

})

const Contact = module.exports = mongoose.model('OwnerCarList',ContactSchema);