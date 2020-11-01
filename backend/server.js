const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const config = require('./config');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');

const mongodbUrl =  "mongodb+srv://ayush:simpleone@cluster0.2epfd.mongodb.net/WebStore?retryWrites=true&w=majority";
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

if (process.env.NODE_ENV === 'production') {
  app.get(/^\/(?!api).*/, (req, res) => { // don't serve react app to api routes
    res.sendFile(path.join(`${__dirname }/../frontend/public/index.html`));
  });
};

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`Server started at port: ${port}`);
});



// ---------------------HEROKU ERROR-------------------
/*
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/public/index.html`));
});
*/