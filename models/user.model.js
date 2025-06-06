import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'], 
        trim: true, 
        minLength: 2, 
        maxLength: 50, 
    }, 
    
    email : {
        type: String, 
        required: [true, 'User Email is required'] , 
        unique: true , 
        trim: true, 
        lowercase: true , 
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'], 

    }, 

    password : {
        type: String, 
        required: [true, 'User Password is required'] , 
        minLength: 6, 
        select : false , 
    } , 

    phone: {
      type: String,
      required: false,
    },

    address: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

}, {timestamps: true}) ; 

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password; // Remove password from all JSON responses
    return ret;
  },
});



const User = mongoose.model('User', userSchema) ; 

export default User ; 