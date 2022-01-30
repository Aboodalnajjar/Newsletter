const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const {
    url
} = require("inspector");
const {
    post
} = require("request");
const { application } = require("express");



const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const Email = req.body.Email;
    const data = {
        members: [{
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    var jsonData = JSON.stringify(data);
    var url = "https://us14.api.mailchimp.com/3.0/lists/2f8b715f17"
    var options = {
        headers:{
            "Content-Type":"application/json"
        },
        method: "POST",
        auth: "abood:e338c7de268687433af4f8389fe63d6e-us14"
    }
    var request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));

        })
        console.log(response.statusCode);
    });
    request.write(jsonData);
    request.end();
});



app.post("/failure", function (req, res) {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at port 3000")
});

// 2f8b715f17

// e338c7de268687433af4f8389fe63d6e-us14