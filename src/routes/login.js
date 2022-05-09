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
.get((req, res) => {
    let r5 = req.session.cuser;
    res.render("myloginpage", {
        header_Username: r5,
    });
})
.post( async (req, res) => {
    try {

        // console.log(req.body.student_radio);
        if (req.body.student_radio == "student") {
            // console.log(req.body.admin_radio);
            const check_Username_available =
                await studentData.findOne({ person_id: req.body.entered_username });
            if (check_Username_available == null) {
                // already tacken
                res.render("myloginpage", {
                    invalid_msg: "Invalid Username"
                })
            }
            else if (check_Username_available.password != req.body.entered_password) {
                res.render("myloginpage", {
                    invalid_msg: "Invalid Password"
                })
            }
            else {
                // cuser = req.body.entered_username;
                req.session.cuser = req.body.entered_username;
                // console.log("after logining  " + req.session.cuser);

                // res.redirect("/");
                res.redirect("studentDashboard");
            }
        }
        else if (req.body.student_radio == "admin") {
            const check_Username_available =
                await adminData.findOne({ admin_id: req.body.entered_username });
            if (check_Username_available == null) {
                // already tacken
                res.render("myloginpage", {
                    invalid_msg: "Invalid Username"
                })
            }
            else if (check_Username_available.password != req.body.entered_password) {
                res.render("myloginpage", {
                    invalid_msg: "Invalid Password"
                })
            }
            else {
                // cuser = req.body.entered_username;
                req.session.cuser = req.body.entered_username;
                // console.log("after logining  " + req.session.cuser);

                // res.redirect("/");
                res.redirect("adminDashboard");
            }
        }
    }
    catch (er) {
        res.send("error in login ");
    }
})

module.exports = router;