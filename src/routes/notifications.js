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

        res.render("notifications")
    }
    catch (err) {
        res.send(err);
    }
});


module.exports = router;