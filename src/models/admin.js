

const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");




const mySchema = new mongoose.Schema({
    admin_id: {
        type: String
    },
    password: {
        type: String
    },

    
    pending_req: [{
      
        fullname: String ,
        person_id: String ,
        password: String ,
        person_email: String ,
        person_contact_number : Number,
        flag : String 
    
    }],

    

})

const adminData = new mongoose.model("adminData", mySchema);

const ppp = new adminData({
    admin_id: "IIITA",
    password: "iiita",
    pending_req : [{
        fullname: "p1 ",
        person_id: "2121",
        password: "aa",
        person_email: "ani@gmail.com",
        person_contact_number : "8805505788",
        flag : "all"

    }]
   

})
// const updating2 =  ppp.save();



// const savedornot = await updating.save();

module.exports = adminData;
