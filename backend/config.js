const dotenv = require('dotenv');

dotenv.config();

module.exports={
  "PORT": "process.env.PORT || 5000",
  "MONGODB_URL": "process.env.MONGODB_URL || mongodb://localhost/webstore",
  "JWT_SECRET": "process.env.JWT_SECRET || somethingsecret",
  "PAYPAL_CLIENT_ID": "client id we can get from developers for paypal",
  "accessKeyId": "process.env.accessKeyId || accessKeyId",
  "secretAccessKey": "process.env.secretAccessKey || secretAccessKey",
};
