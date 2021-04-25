const request = require('request')
// separate file so that the code can be reused

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmpleWVwYXRjaCIsImEiOiJja243bG1zenMwZWIwMndsbnl4NXRvYjNkIn0.Rg04p0O9sEuuC3NC29gtsg&limit=1'
    // without encodeURIComponent() special characters in address can't be handled and program will crash
    request({url, json:true},(error,response) => { // was originally response but everywhere we are using properties under response.body so we destructured it
        if(error){
            callback('Unable to connect to Geocoding services',undefined)
        }
       else{
        const {body} = response
        //console.log(body)
        if(body.features.length ==0){
            callback('Unable to find location! Please try again!',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    }
    })
}

module.exports = geocode