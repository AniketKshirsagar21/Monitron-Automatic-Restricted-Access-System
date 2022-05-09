

const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");




const mySchema = new mongoose.Schema({
    person_id: {
        type: String
    },
    password: {
        type: String
    },
    fullname: {
        type: String
    },
    person_email: {
        type: String
    },
    person_contact_number: {
        type: Number
    },
    flag :{
        type : String 
    },
    status :{
        type : String 
    },
    date :{
        type : Date
    }
    
})

const studentData = new mongoose.model("studentData", mySchema);

const ppp = new studentData({
    fullname: "aniket ksagar",
    person_id: "IIT2020088",
    password: "aa",
    person_email: "ani@gmail.com",
    person_contact_number : "8805505788",
    flag : "all",
    status : "none",
    // date: new Date()

})
// const updating2 =  ppp.save();



// const savedornot = await updating.save();

module.exports = studentData;
