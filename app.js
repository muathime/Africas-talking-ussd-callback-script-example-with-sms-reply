require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var sms = require("./sms");

app.use(bodyParser.json()); // support json encoded body
// app.use(bodyParser.urlencoded({ extended: true })); // support encoded url data. WE may not need this for this implementation

app.post("/post", async (req, res) => {
  try {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    console.log("####################", req.body);
    console.log(
      "Text: " +
        text +
        " Session: " +
        sessionId +
        " Code: " +
        serviceCode +
        " Phone: " +
        phoneNumber
    );

    let response = "";
    let password = "12345"; //query for password from api using the user's "phoneNumber"

    if (text === "") {
      response = `CON Welcome to <Company X>, Please select service
        1. Find Charging Stations
        2. Locate my Ev(s)`;
    } else if (text === "1") {
      response = `CON Which Town are you in?
        1. Nairobi
        2. Mombasa
        3. Other`;
    } else if (text === "1*1") {
      sms(
        "<Use your logic to populate this message>",
        phoneNumber
      );
      response = `END You will receive an SMS with a list of charging stations in Nairobi`;
    } else if (text === "1*2") {
      sms(
        "<Use your logic to populate this message>",
        phoneNumber
      );
      response = `END You will receive an SMS with a list of charging stations in Mombasa`;
    } else if (text === "1*3") {
      sms(
        "<Use your logic to populate this message>",
        phoneNumber
      );
      response = `END You will receive an SMS with a list of charging stations available upcountry.`;
    } else if (text === "2") {
      response = `CON Please Enter your password`;
    } else if (text === "2*" + password) {
      sms(
        "Hi, here is your EV's current location: <location Url here>",
         phoneNumber
      );
      response = `END Your EV's current location has been send to your number ${phoneNumber}. Thank you!`;
    }
    // Print the response onto the page so that our SDK can read it
    res.set("Content-Type: text/plain");
    res.send(response);
  } catch (error) {
    res.status(400).send("Http POST request failed!" + error);
    console.log(error);
  }
});

app.get("/get", async (req, res) => {
  try {
    const data = req.body;
    res.status(200).send("Http GET request received!" + JSON.stringify(data));
  } catch (error) {
    res.status(400).send("Http GET request failed!" + error);
    console.log(error);
  }
});

app.get("/logs", async (req, res) => {
  try {
    const data = req.body;
    console.log(JSON.stringify(data));
  } catch (error) {
    res.status(400).send("Http GET request failed!" + error);
    console.log(error);
  }
});

module.exports = app;