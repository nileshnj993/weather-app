const request = require('request')

const url = 'https://api.darksky.net/forecast/5f880e9f4243965f7fbb766df6664138/37.8267,-122.4233?units=si'

request({url:url,json:true},(error,response) => {
    if(error){
        console.log('Unable to connect to Weather service!')
    } // if no network then error is true

    else if(response.body.error){
        console.log('Unable to find location')
    } // if network is there but coordinates not given properly. response is generated but with errors

    else{
    const data = response.body // as json option set to true, response is already parsed
    console.log(data.daily.data[0].summary + " It is currently "+data.currently.temperature+" degrees out. There is a "+data.currently.precipProbability+"% chance of rain.")
    }
    // console.log(error) - prints error if for whatever reason api can't be accessed - wrong URL, no internet, api not in service anymore
}) 

// Geocoding API - convert text location to longitude and latitude

const url1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibmpleWVwYXRjaCIsImEiOiJja243bG1zenMwZWIwMndsbnl4NXRvYjNkIn0.Rg04p0O9sEuuC3NC29gtsg&limit=1'
request({url:url1,json:true},(error,response) => {
   if(error){
       console.log('Unable to connect to Geocoding service!')
   }
   else if(response.body.message || response.body.features.length == 0){
       console.log('Unable to find location. Please try again!')
   } // features is empty if meaningless name is provided. Message is printed if invalid url
    else{
    const data = response.body
    console.log('Coordinates of '+data.features[0].place_name)
    console.log('Longitude: '+data.features[0].center[0])
    console.log('Latitude: '+data.features[0].center[1])
   }
})