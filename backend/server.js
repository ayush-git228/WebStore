const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const uploadRoute = require('./routes/uploadRoute');
const request = require("request");

const mongodbUrl =  "process.env.MONGODB_URL || mongodb://localhost/tracker";
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => error.reason);

const app = express();
const port=process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
});
/*
app.get('/api/data',(req,res)=>{
  console.log(req);
})  */
/*
const axios = require("axios");

const {options}=axios({
    "method":"GET",
    "url":"https://human.p.rapidapi.com/human/body_fat/daily/null",
    "headers":{
    "content-type":"application/octet-stream",
    "authorization":"",
    "x-rapidapi-host":"human.p.rapidapi.com",
    "x-rapidapi-key":"a7b909ccd1msh63860c7c52c506bp1bbc50jsna6241f9215e6",
    "useQueryString":true
    }
    })
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })

app.get('/api/data',options,(req,res)=>{
  console.log(request);
})*/
/*
const request = require("request");

const forecast = (latitude,longitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=463cb5f6923255cf04f5d8fcedeb8a88&query="+latitude+","+longitude+"&units=m";
    // Instead of url:url just url.    RESPONSE below is an OBJECT whose only property we are accessing is BODY.
    // request({url,json:true},(error,response)=>{   WE would replace every (response.body) with (body)

    request({url,json:true},(error,{body})=>{   // response come is a Json string. // request first parameter is the options.   // response conatins all sort of information that we get from the url. and there the error will be undefined if there is no error. 
        if(error)
        {
            callback("Network Error!!",undefined);   // Make it reusable so it will pass it back to the callback and when we call 5 times geocode and can choose 5 diff things.
        }
        else if(body.error)   // If we remove both latitude and longitude from the query string. 
        {
            callback("Try Another Search!",undefined); 
        }
        else if(body.current.temperature<=15)
        {
            callback(undefined,"It is cold out there! "+ body.current.weather_descriptions[0]
            + "with temperature " + body.current.temperature);
        }
        else{
            callback(undefined,{
                weather_info : body.current.weather_descriptions,
                region : body.location.region,
                temperature : body.current.temperature,  
                is_day: body.current.is_day,
            })
        }
    })
}

module.exports = forecast;

*/
/*
var options = {
  method: 'GET',
  url: 'https://human.p.rapidapi.com/human/sleep/series',
  headers: {
    authorization: '',
    'x-rapidapi-host': 'human.p.rapidapi.com',
    'x-rapidapi-key': 'a7b909ccd1msh63860c7c52c506bp1bbc50jsna6241f9215e6',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);

	request.send(response);
});
*/
/*
app.get("/genetics",(req,res)=>{
  console.log(req.query);  // So the query string is parsed by the express and is present in this object.
  //const genes= req.query.genes;
  /*if(!genes)
  {
      return res.send("Provide Address to Find!");
  }*/

var options = {
  method: 'GET',
  url: 'https://human.p.rapidapi.com/human/genetics/traits',
  headers: {
    authorization: '',
    'x-rapidapi-host': 'human.p.rapidapi.com',
    'x-rapidapi-key': 'a7b909ccd1msh63860c7c52c506bp1bbc50jsna6241f9215e6',
    useQueryString: true
  }
};

request(options, function (error, response, body) {
	if (error) throw new Error(error);
  else{
    return console.log(response);
  }

});
// })

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
