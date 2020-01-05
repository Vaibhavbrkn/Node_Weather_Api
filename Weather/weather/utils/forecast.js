const request = require('request');

const forecast = (latitude , longitude , callback)=>{
    const URL = 'https://api.darksky.net/forecast/721c52824b0a606d217512c41a29aee0/'+latitude+','+longitude+'?units=si'

    request({url:URL , json:true} ,(error , response)=>{
        if(error){
            callback('unable to connect to weather services' , undefined)
        }else if(response.body.error){
            callback('unable to find location, try another search' , undefined)
        }
        else{
            callback(undefined , response.body.daily.data[0].summary + ' it is currently ' + response.body.currently.temperature + ' out')
        } 
    })
}

module.exports = forecast;