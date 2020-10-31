const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');

const mongodbUrl =  "mongodb://localhost:27017/tracker";
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }).then(()=>{
    console.log("Connected Successfully to the database");
  })
  .catch((error) => error.reason);
 
const app = express();
const port=process.env.PORT || 5000;

app.use(require('cors')());       // CORS MIDDLEWARE

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

//app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));  // Added '/' extra
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/public/index.html`));
});

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
