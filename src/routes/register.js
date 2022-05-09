const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');
const hbs = require('hbs');
const studentData = require("../models/registers")
const adminData = require("../models/admin")
const fetch = require('node-fetch');
const e = require('express');
const async = require('hbs/lib/async');
const { redirect } = require('express/lib/response');
const router = require('express').Router();



router.route('/')

.get( (req, res) => {
    let r5 = req.session.cuser;
    if (req.session.cuser == "userwho") {
        r5 = "--"
    }
    res.render("myregisterpage", {
        header_Username: r5,

    });
})

.post( async (req, res) => {
    try {
        const check_Username_available =
            await studentData.findOne({ person_id: req.body.person_id });
        if (check_Username_available != null) {
            // already tacken
            res.render("myregisterpage", {
                notavailable: "ID not available",
                fullname: req.body.fullname,
                person_id: req.body.person_id,
                Choosen_password: req.body.Choosen_password,
                person_email: req.body.person_email,
                person_contact_number: req.body.person_contact_number,  

            })
        }
        else if (req.body.person_id == "") {
            // already tacken
            res.send("username not valid ");
        }
        else {
            if(req.body.Confirm_password != req.body.Choosen_password){
                res.send("Password not Matching");
            }
            // available
            // save to database and update current username

            const ppp = new studentData({
                fullname: req.body.fullname,
                person_id: req.body.person_id,
                password: req.body.Choosen_password,
                person_email: req.body.person_email,
                person_contact_number: req.body.person_contact_number,
                flag : "all",
                status : "none",
                date: new Date()

                



            })
            const updating2 = ppp.save();

            

            const add = {
                fullname: req.body.fullname,
                person_id: req.body.person_id,
                password: req.body.Choosen_password,
                person_email: req.body.person_email,
                person_contact_number: req.body.person_contact_number,
                flag : "all",
                date: new Date()

            }

            const updating88 = await adminData.findOneAndUpdate({ admin_id: "IIITA" }, {
                $addToSet: {
                    pending_req: add
                },
            });

            // cuser = req.body.person_id;
            req.session.cuser = req.body.person_id;
            // res.redirect("/");
            res.redirect("studentDashboard");
        }
    }
    catch (er) {
        res.send("er in register post");
    }
})


module.exports = router;