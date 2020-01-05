const request = require('request');

const GEO = (address , callback)=>{
    const geoURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmFpYmhhdmJya24iLCJhIjoiY2s1MGs3OWl3MGw2ZDNscDd1cmxocm9seSJ9.kmdtNs7mtfGpYkGkVlt8hw'
    request({url:geoURL , json:true} ,(error , response)=>{
        if(error){
            callback('unable to connect to location services' , undefined)
        }else if(response.body.features.length ===0){
            callback('unable to find location, try another search' , undefined)
        }
        else{
            callback(undefined ,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location:  response.body.features[0].place_name
            })
        } 
})
}

module.exports = GEO;