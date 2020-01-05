const request = require('request');
const GEO = require('./utils/GEO.js')
const forecast = require('./utils/forecast.js')

const address = process.argv[2]

if(!address){
    console.log('provide an address')
}
else{
    GEO(address,(error , {latitude , longitude , location})=>{
        if(error){
            return console.log(error)
        }
        forecast(latitude, longitude, (error , forecastData)=>{
            if(error){
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
        })
    })
}






