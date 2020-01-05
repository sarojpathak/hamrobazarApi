const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true  
    },
    password:{
        type:String,
        require:true,
        minlength:6,
        maxlength:20
    },
    phone:{
        type:Number,
        require:false
    },
    mobilePhone:{
        type:Number,
        require:false   
    },
    street:{
        type:String,
        require:true
    },
    area:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    newsletter:{
        type:Boolean,
        default:false
    },
    hidePhone:{
        type:Boolean,
        default:false
    },
    agree:{
        type:Boolean,
        default:false
    },
    admin:{
        type:Boolean,
        default:false
    }

},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);