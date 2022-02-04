//we have to import all the libraries that we just installed using node require
const express = require("express");
const bodyParser = require("body-parser");
//we didn't bring in path into our package.jsonbecause it gets bundled into any node project (it's a native module)
//and it let us build pathing to directories
// const cors = require("cors");
const path = require("path");
//compression and gziping all our files and chunks for better performance
const compression = require("compression");

//this is how we keep the secret stripe key secret
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//this will istantiate for us new express app
const app = express();

//the port we host our app on
//if there is a PORT in the process environement we'll use that port else PORT=5000
//when you deploy to heroku it sets the port for us
const port = process.env.PORT || 5000;

app.use(compression());

//if we want our frontEnd to access our web server so we'll go to package.json of the client and tell it to use the port 5000 whenever we make an API request
//add "proxy": "http://localhost:5000"

//Here we are configuring express to use body-parser as middle-ware.
//all the requests coming in convert their body into json
app.use(bodyParser.json());

//urlencoded ensure that the url string doen't contain any spaces or symboles
app.use(bodyParser.urlencoded({ extended: true }));

//it checks if the origin is the same so we can make reauests properly between our front and backend (let's say we hosted our app on google server and request came in from amazon server cros will block it because it not the same origin)
// app.use(cors());

if (process.env.NODE_ENV === "production") {
  //we want to serve all the static all of the static files in our build
  //__dirname is part of Nodejs that tells us which directory we are in
  //remember when we run (npm run build) we get a build folder inside client folder
  app.use(express.static(path.join(__dirname, "client/build")));

  //then we have to determine which route we have to serve it at
  // '*' => this is for every URL
  app.get("*", function (req, res) {
    //sending the html css js
    //we will send the index html inside the build folder which is inside client folder (index.html containes all html css js all our frontEnd client code)
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, (error) => {
  if (error) throw error;
  console.log("Server running on port " + port);
});

//building the Payment Route

//the type of the route we want is post because we'll receive an actual reaquest from the clientside code and then send data to STRIPE API
app.post("/payment", (req, res) => {
  //req object is the one will provide us with token we send from the clienSide app in order to make the charge
  //and now we have to create the appropriate body that we pass to Stripe using values that we get from the Token
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd",
  };

  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  });
});
