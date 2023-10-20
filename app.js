//jshint esversion: 6

const  express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(bodyParser.urlencoded({exended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us21.api.mailchimp.com/3.0/lists/47b2b38e5c";

  const options = {
    method: "POST",
    auth: "iulia2:b5134f2e01a2702a2276235797d93845-us2"
  }

  const request = https.request(url, options,function(response){

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }


    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  //request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});





app.listen(process.env.PORT || 3000 function() {
  console.log("Server is running on port 3000!");
});

//API key
// a5ab0735c0e8bc953d35cd0f110b1d4d-us21

//list id : 47b2b38e5c.
