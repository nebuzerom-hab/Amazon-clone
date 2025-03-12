// const dotenv = require("dotenv");
// dotenv.config(); // This should be the first thing

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const express = require("express");
// const cors = require("cors");

// console.log("Stripe Key:", process.env.stripe_key);
// const stripe = require("stripe")(process.env.stripe_key);

// const app=express()
// app.use(cors({origin:true}))
// app.use("/",(req,res)=>{
//     res.status(200).json({
//         message:"succes !"
//     })
// })
const dotenv = require("dotenv");
const cors = require("cors");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");

dotenv.config();

// console.log("Stripe Key:", process.env.stripe_key);

const stripe = require("stripe")(process.env.STRIPE_KEY);

// Set up Express app
const app = express();

// Use CORS for all routes
app.use(cors({ origin: true }));

// Basic route to test
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});
app.post("/payment/create", async (req, res) => {
  const total =parseInt(req.query.total);

  if (total > 0) {
    console.log("recived", total);
    

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

// Export the app as a Firebase function
exports.api = onRequest(app);
