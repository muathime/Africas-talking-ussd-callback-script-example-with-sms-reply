var axios = require("axios");
var qs = require("qs");

module.exports = function (userMsg, userPhone) {
var data = qs.stringify({
  username: "<yourUserName>", // Change this to your Username
  to: userPhone,
  message: userMsg,
  bulkSMSMode: "1",
  from: "<yourShortCode>", // Change this to your Shortcode
});
var config = {
  method: "post",
  url: "https://api.africastalking.com/version1/messaging",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    apiKey: "<yourApiKey>", // Change this to your ApiKey
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
}