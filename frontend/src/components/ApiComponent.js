import React from "react";
function Api(){


    const {data} = fetch("https://human.p.rapidapi.com/human/body_fat/daily/%7Bdate%7D", {
        "method": "GET",
        "headers": {
            "authorization": "",
            "x-rapidapi-host": "human.p.rapidapi.com",
            "x-rapidapi-key": "a7b909ccd1msh63860c7c52c506bp1bbc50jsna6241f9215e6"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    });
      return(
           <div>
               {console.log(data)}
           </div>
       )
   }
   
   export default Api;