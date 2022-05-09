const express = require('express');
const alert = require('alert');
const session = require('express-session');
const app = express();
const path = require('path');
const hbs = require('hbs');
const studentData = require("./models/registers")
const adminData = require("./models/admin")
const fetch = require('node-fetch');
const e = require('express');
const async = require('hbs/lib/async');
const { redirect } = require('express/lib/response');

require('./db/conn');
const router = require('express').Router();




app.use(express.json());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

const temppathviews = path.join(__dirname, "../templates/views");
const temppathpartials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", temppathviews);
hbs.registerPartials(temppathpartials);

hbs.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 < v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper('ifEqual', function (v1, v2, options) {
    if (v1 == v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.use(session({
    secret: 'se',
    resave: false,
    saveUninitialized: false,
}))


let st = new Date();


app.get("/", async (req, res) => {
    try {
        if (!req.session.start_time) {
            req.session.start_time = new Date();
        }

        st = req.session.start_time;
        if (!req.session.cuser) {
            req.session.cuser = "temp";
        }
        let r5 = req.session.cuser;

        res.render("myloginpage", {
            header_Username: r5,
        });
    }
    catch (err) {
        res.send(err);
    }
})


const login = require('./routes/login');
app.use('/myloginpage', login);

const registerpage = require('./routes/register');
app.use('/myregisterpage', registerpage);

const Studentdashboard = require('./routes/Studentdashboard');
app.use('/studentDashboard', Studentdashboard);

const notifications = require('./routes/notifications');
app.use('/notifications', notifications);

const updateInfo = require('./routes/updateInfo');
app.use('/updateInfo', updateInfo);

const adminDashboard = require('./routes/adminDashboard');
app.use('/adminDashboard', adminDashboard);

app.post("/logout", async (req, res) => {
    req.session.cuser = "temp";
    res.redirect("/");
})

app.post("/allflag", async (req, res) => {
    try {
        const check_Username_available =
            await studentData.findOne({ person_id: req.body.personID });
        if (check_Username_available == null) {
            res.send("invalid username")
        }
        else {
            const updating88 = await studentData.findOneAndUpdate({ person_id: req.body.personID }, {
                flag: "all"
            });
            req.session.cuser = req.body.person_id;
            res.redirect("adminDashboard");
        }
    }
    catch (er) {
        res.send("error in giving flag");
    }
})

app.post("/dayflag", async (req, res) => {
    try {
        const check_Username_available =
            await studentData.findOne({ person_id: req.body.personID });
        if (check_Username_available == null) {
            res.send("invalid username")
        }
        else {
            const updating88 = await studentData.findOneAndUpdate({ person_id: req.body.personID }, {
                flag: "day"
            });
            req.session.cuser = req.body.person_id;
            res.redirect("adminDashboard");
        }
    }
    catch (er) {
        res.send("error in giving flag");
    }
})

app.post("/timeflag", async (req, res) => {
    try {
        const check_Username_available =
            await studentData.findOne({ person_id: req.body.personID });
        if (check_Username_available == null) {
            res.send("invalid username")
        }
        else {
            const updating88 = await studentData.findOneAndUpdate({ person_id: req.body.personID }, {
                flag: "time"
            });
            req.session.cuser = req.body.person_id;
            res.redirect("adminDashboard");
        }
    }
    catch (er) {
        res.send("error in giving flag");
    }
})

app.post("/restrict", async (req, res) => {
    try {
        const check_Username_available =
            await studentData.findOne({ person_id: req.body.personID });
        if (check_Username_available == null) {
            res.send("invalid username")
        }
        else {
            const updating88 = await studentData.findOneAndUpdate({ person_id: req.body.personID }, {
                flag: "restricted"
            });
            req.session.cuser = req.body.person_id;
            res.redirect("adminDashboard");
        }
    }
    catch (er) {
        res.send("error in giving flag");
    }
})



app.post("/gotostudentdashboard", async (req, res) => {
    try {

        req.session.cuser = req.body.personID;
        res.redirect("studentDashboard");

    }
    catch (er) {
        res.send("error in giving flag");
    }
})


const nodemailer = require('nodemailer');


app.post("/entering", async (req, res) => {
    try {
   

        const temp =
            await studentData.findOne({ person_id: req.session.cuser });

        if (temp.flag == "restricted") {
            alert("You are restricted from entering into the building !");
            res.redirect("studentDashboard");
        }

        else if (temp.flag == "all") {
            const temp = await studentData.findOne({ person_id: req.session.cuser });
            if (temp.status == "Entered into the building") {
                alert("You are already inside the building !")
            }

            else {
                start_time = new Date();
                const updating88 = await studentData.findOneAndUpdate({ person_id: req.session.cuser }, {
                    status: "Entered into the building",
                    date: new Date()
                });

                // timer start 
            }
            // res.send("all");
        }

        else if (temp.flag == "day") {

            const temp = await studentData.findOne({ person_id: req.session.cuser });
            if (temp.status == "Entered into the building") {
                alert("You are already inside the building !")
            }

            else {
                start_time = new Date();

                const updating88 = await studentData.findOneAndUpdate({ person_id: req.session.cuser }, {
                    status: "Entered into the building",
                    date: new Date()
                });
                // timer start 
            }


            // res.send("day");

        }

        else if (temp.flag == "time") {
            // res.send("time");
            const temp = await studentData.findOne({ person_id: req.session.cuser });
            if (temp.status == "Entered into the building") {
                alert("You are already inside the building !")
            }

            else {
                start_time = new Date();

                const updating88 = await studentData.findOneAndUpdate({ person_id: req.session.cuser }, {
                    status: "Entered into the building",
                    date: new Date()
                });
                // timer start 
            }

        }



        res.redirect("studentDashboard");

    }
    catch (er) {
        res.send("error in giving flag");
    }
})


app.post("/exiting", async (req, res) => {
    try {
        const temp =
            await studentData.findOne({ person_id: req.session.cuser });

        if (temp.status == "none") {
            alert("You are not inside the building !")
        }

        else {

            const updating88 = await studentData.findOneAndUpdate({ person_id: req.session.cuser }, {
                status: "none"
            });

            // timer = 0 ;
        }
        res.redirect("studentDashboard");
    }
    catch (er) {
        res.send("error in giving flag");
    }
})



const port = process.env.PORT || '8800';
app.listen(port, ["192.168.56.1", "localhost"], () => {
    console.log(("listened on port 8000"));
})


