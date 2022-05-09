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
const alert = require('alert');
const swal = require('sweetalert');

app.use(session({
    secret: 'sc',
    resave: false,
    saveUninitialized: false,
}))

const nodemailer = require('nodemailer');


router.route('/')

    .get(async (req, res) => {
        try {
            swal("hii");
            // console.log("very first " + req.session.cuser);

            var cnoh;
            let r5 = req.session.cuser;

            cnoh = await studentData.findOne({ person_id: req.session.cuser });
            // console.log(".js" + cnoh.date);

            if (!req.session.start_time) {
                req.session.start_time = new Date();
            }


            req.session.start_time = cnoh.date;
            // console.log("check = " +   req.session.start_time);



            if (cnoh.flag == "time" && cnoh.status == "Entered into the building") {

                var i = setInterval(async function () {
                    try {

                        let sentFlag = 0;
                        const current = new Date();
                        const total_time = current.getTime() - (req.session.start_time).getTime();

                        // console.log("current ending " + total_time);
                        // console.log( req.session.start_time + " " + current);

                        if (total_time >= 120000) {
                            // console.log(("time ending " + total_time));


                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'monitron2@gmail.com',
                                    pass: 'Monitron@123'
                                }
                            });

                            var mailOptions = {
                                from: 'monitron2@gmail.com',
                                to: cnoh.person_email,
                                subject: `Dear ${cnoh.fullname} , Your time is up`,
                                text: `${cnoh.fullname} have 5 minutes left inside the CC3 Building. Please leave within the time limit`
                            };

                            if (sentFlag == 0) {
                                const as = await transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error.message);

                                    } else {
                                        sentFlag = 1;
                                        console.log('Email sent: ' + info.response);
                                    }
                                });

                                const as2 = await studentData.findOneAndUpdate({ person_id: req.session.cuser }, {
                                    status: "none",
                                });

                                alert("Time UP !")
                                // window.location.reload();


                            }

                            res.render("studentDashboard", {
                                header_Username: r5,
                                fullname: cnoh.fullname,
                                person_id: cnoh.person_id,
                                person_email: cnoh.person_email,
                                person_contact_number: cnoh.person_contact_number,
                                flag: cnoh.flag,
                                status1: cnoh.status,
                                datee: cnoh.date
                            })

                            clearInterval(i);
                        }
                    }
                    catch (err) {
                        console.log("error in timeout function " + err)
                    }
                }, 6000);

            }




            if (cnoh.flag == "day" && cnoh.status == "Entered into the building") {

                var i = setInterval(async function () {
                    try {

                        let sentFlag = 0;
                        const current = new Date();
                        const end_time = new Date();
                        end_time.setUTCHours(23,59,59,999);

                        if (current == end_time) {
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'monitron2@gmail.com',
                                    pass: 'Monitron@123'
                                }
                            });

                            var mailOptions = {
                                from: 'monitron2@gmail.com',
                                to: cnoh.person_email,
        
                                subject: `Dear ${cnoh.fullname} (Day flag) , Your time is up`,
                                text: `${cnoh.fullname} (Day flag)  have 5 minutes left inside the CC3 Building. Please leave within the time limit`
                            };

                            if (sentFlag == 0) {
                                const as = await transporter.sendMail(mailOptions, function (error, info) {
                                    if (error) {
                                        console.log(error.message);

                                    } else {
                                        sentFlag = 1;
                                        console.log('Email sent: ' + info.response);
                                    }
                                });

                                const as2 = await studentData.findOneAndUpdate({ person_id: req.session.cuser }, {
                                    status: "none",
                                });

                                alert("Time UP !");


                            }

                            res.render("studentDashboard", {
                                header_Username: r5,
                                fullname: cnoh.fullname,
                                person_id: cnoh.person_id,
                                person_email: cnoh.person_email,
                                person_contact_number: cnoh.person_contact_number,
                                flag: cnoh.flag,
                                status1: cnoh.status,
                                datee: cnoh.date
                            })

                            clearInterval(i);
                        }
                    }
                    catch (err) {
                        console.log("error in timeout function " + err)
                    }
                }, 6000);

            }


            res.render("studentDashboard", {
                header_Username: r5,
                fullname: cnoh.fullname,
                person_id: cnoh.person_id,
                person_email: cnoh.person_email,
                person_contact_number: cnoh.person_contact_number,
                flag: cnoh.flag,
                status1: cnoh.status,
                datee: cnoh.date
            })

        }
        catch (err) {
            res.send(err);
        }
    });



module.exports = router;