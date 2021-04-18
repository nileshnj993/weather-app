const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const place = process.argv[2]

if(process.argv.length>2){
geocode(place, (error, body) => {
     if(error)
        console.log(error)
     else{   
     //console.log(data)
     const {latitude,longitude,location} = body
    forecast({
        latitude: latitude,
        longitude: longitude
    }, (error, {summary,temp,rain}) => { // use a name other than data for the parameter here else inner function cant access properties of top data
        if(error)
            console.log(error)
        else{
           
            console.log(chalk.inverse.whiteBright('Weather Report of '+location))
            console.log(summary + " It is currently "+temp+" degrees out. There is a "+rain+"% chance of rain.")
        }
    })
} })
}
else{
    console.log('No location provided!')
}
    




// since we have made reusable code available, we can remove the earlier static code
