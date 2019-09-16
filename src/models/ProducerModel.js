const { Schema, model }  = require('mongoose');



const AddressSchema = new Schema({
    neighborhood:{
        type:String,
        required:false
    },
    street:{
        type:String,
        required:false
    },
    number:{
        type:Number,
        requirede:false,
    },

    state:{
        type:String,
        required:false
    },
    city:{
        type:String,
        required:false
    }
})

const AvaliationSchema = new Schema({
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        description:{
            type:String
        },
        relevance:Number
      
}, 
{
    timestamps:true,    
})

const ProducerSchema = new Schema({
    nameFarm:{
        type:String,
        required:[true, "É necessario colocar um nome"]
    }, 
   
    address:{ AddressSchema },
    contacts:{ phone:{
        type:String,
        required:false
    },
    email:{
        type:String,
        required:[true, "É necessário colocar uma email"]
    },
    site:{
        type:String,
        required:false
    }
},
    location: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: false
        },
        coordinates: {
          type: [Number],
          required: false
        }
    },
    products:[{type:String}],
    avaliation:[AvaliationSchema],

 
},
{
 timestamps:true,    
})




module.exports = model('Producer', ProducerSchema);