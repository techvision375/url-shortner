const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      

    },
    email: {
      type: String,
   
      unique:true,
    },
    password: {
      type: String,
     
  
    },
    role:{
      type:String,
      required:true,
      default:"NORMAL"
    }
   
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;


// ->>>>>>"user" (first argument in mongoose.model) is just a name Mongoose uses to create
//  the collection name in the database (which becomes "users" automatically).


// ->>>>>>User is the JavaScript variable holding the Mongoose model, which you use in 
// your code to interact with the "users" collection.
// The User variable stores the Mongoose model, which you can use to create, read, update, 
// and delete users from the MongoDB database.