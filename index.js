//Jshint esversion: 6
const express = require("express")
const request = require("request")
const app = express()
app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    let crypto = req.body.crypto;
    let fiat = req.body.fiat;
    let amount = req.body.amount;

    //MAKING REQUEST USING PARAMETERS
    let options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        method: "GET",
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }
    
    request(options, function(error, response, body){
        let data = JSON.parse(body);//parsing the json object as js
        let price = data.price; //or copy the path from the json tree
        
        console.log(price);

        let currentDate = data.time;

   
    res.write("<p>The current datetime is "+ currentDate +"  </p>")
    res.write("<h1>" + amount + crypto + " is currently worth "+ price + fiat +" </h1>")
    res.send()
    
    })
})


app.listen(process.env.PORT || 3000, function() {
    console.log("server is running on port 3000")
})