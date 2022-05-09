
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monitron')
    .then(() => console.log("Database connection successfull "))
    .catch((err) => {
        console.log("error in database connection");
    })
