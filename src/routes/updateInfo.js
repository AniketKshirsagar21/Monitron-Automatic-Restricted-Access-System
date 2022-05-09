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
    .get(async (req, res) => {
        try {

            res.render("updateInfo", {

            })
        }
        catch (err) {
            res.send(err);
        }
    })
    .post(async (req, res) => {
        try {
            if (req.body.newPassword != req.body.newConfirmPassword) {
                alert("Password is not matching");
                // res.render("updateInfo");

            }
            else {
                console.log(req.body.newName);
                console.log(req.body.newPassword);
                console.log(req.body.newEmail);

                const updating88 = await studentData.findOneAndUpdate({ person_id: req.session.cuser }, {
                    fullname: req.body.newName,
                    password: req.body.newPassword,
                    person_email: req.body.newEmail,
                    person_contact_number: req.body.newNumber,
                });
                // alert("Information updated successfully !");
                
                
            }
            
            res.render("updateInfo");
        }
        catch (err) {
            res.send(err);
        }
    })



module.exports = router;