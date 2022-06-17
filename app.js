const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: lastname
        }
      }
    ]
  };


  const jsondata = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/27dc9d43ad";

  const options = {
    method: "POST",
    auth: "Aryan:808c7d84146aa62374f49f790e47a4d9-us8"
  }
  const request = https.request(url,options,function(response){
      if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }

    response.on("data",function(data){
      console.log(response.statusCode);
      console.log(JSON.parse(data));
    })
  })


  request.write(jsondata);
  request.end();

})

app.post("/failure",function(req,res){
  res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on 3000");
})

//api key
// 808c7d84146aa62374f49f790e47a4d9-us8

//audience // IDEA: 27dc9d43ad
