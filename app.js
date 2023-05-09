const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function (req, res){

res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req,res) {

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
   }

   const jsonData = JSON.stringify(data);

   const url =  "https://us21.api.mailchimp.com/3.0/lists/b9daa3183b";

   const options = {
     method: "POST",
     auth: "myhd:d6eab4330b83b1cd2256622e0b57f9bc-us21"
   }

   const request = https.request(url, options, function(response){
    if (response.statusCode == 200){
        res.sendFile(__dirname + "/success.html")
    }else {
        res.sendFile(__dirname + "/failure.html")
    }
    
    response.on("data", function(data){
        console.log(JSON.parse(data));
        console.log(response.statusCode);
        
    })
    
   })

   request.write(jsonData);
   request.end();
})

app.post("/failure", function(req,res){
res.redirect("/");
})
app.listen( process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000.");
});



// d6eab4330b83b1cd2256622e0b57f9bc-us21
// b9daa3183b