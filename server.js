const express = require('express');
const mongoose = require('mongoose');
const routes = require("./routes");
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(routes);
if (process.env.NODE_ENV === "production") {app.use(express.static("client/build"));} 

const db = require("./config/keys").mongoURI;
mongoose.connect(db, { useNewUrlParser: true }).then(() => console.log("MongoDB connected")).catch((err) => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/api/users', users);
app.use(routes);

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));

// Set Port to listen
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
