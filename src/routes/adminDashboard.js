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
.get( async (req, res) => {
    try {
        // console.log("h");

        const cnoh = await adminData.findOne({ admin_id: "IIITA" });
        var pending_req = cnoh.pending_req;

        let cclist2 = [];


        // console.log(pending_req);
        res.render("adminDashboard", {
            list: pending_req,
            header_Username: req.session.cuser,

        })

    }
    catch (er) {
        res.send(er);
    }
})



module.exports = router;