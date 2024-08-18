const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
require("./db/conn.js");
const User = require("./models/usermessage.js");

const app = express();
app.use(express.json());
const port = process.env.PORT || 8001;

const staticpath = path.join(__dirname, "../public");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
app.use(express.static(staticpath));

// ROUTING

app.get("/", (req, res) => {
    res.render("index.hbs");
});

app.post("/", async (req, res) => {
    try {
        console.log(req.body); // Log the received data
        const newData = new User(req.body);
        await newData.save();
        res.status(201).render("index.hbs");
    } catch (err) {
        console.log(err + " this is the error");
        res.status(500).send(err);
    }
});

app.get("*", (req, res) => {
    res.send('404err');
});

app.listen(port, () => {
    console.log(`listening to the port no ${port}`);
});
