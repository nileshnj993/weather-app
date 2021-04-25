const path = require('path') // used to join and manipulate path variables in a cross platform compatible manner
// console.log(__dirname) // full path of current directory
// console.log(__filename) // full path of current file
const request = require('request')
const express = require('express')
// Express is used to host our apps on web servers so it can be used from places other than cmd

const hbs = require('hbs')

const app = express() // initialzing web server
// under app we can set up various routes and what responses will be sent on each route
// console.log(path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views') // to customize views folder

const partialsPath = path.join(__dirname, '../templates/partials')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

app.set('view engine', 'hbs') // this sets up handlebars that can be used to serve up dynamic content and replicate code like headers and footers in multiple pages
// the views folder is meant to contain all hbs views to integrate dynamic features
// static files like index.html can be removed
app.set('views', viewsPath)
// to change default name and location of hbs directory from views to whatever 
hbs.registerPartials(partialsPath)

app.use(express.static(path.join('__dirname', '../public'))) // shift the directory app looks into for serving up html, css etc

app.get('', (req,res) => {
    res.render('index', {
        title:'Weather',
        name: 'Nilesh Jain'
    }) // use render for hbs files without extension
    // on encountering render, express goes off and searches for hbs (dynamic content) and renders it
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About',
        name:'Nilesh Jain'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        text:'For any queries, please contact ',
        title:'Help',
        name:'Nilesh Jain'
    })
})
/* app.get('', (req, res) => { // default route - app.com. get is used to define the response on each route
    // request and response
    res.send('<h1>Hello Express!</h1.') // displayed on browser / sent to whoever requested
}) */


/*app.get('/help', (req,res) => {
    res.send([{
        name:'Nilesh',
        age:20
    },{
        name:'Ram',
        age:21
    }])
}) */ // can send JSON also.. just send an object or an array of objects

/*app.get('/about', (req,res)=> {
    res.send('<h2><i>This is the about section!</i></h2><hr>')
})*/

app.get('/weather', (req,res)=> {
        if(!req.query.address){
            res.send({
                error:'Please enter location!'
            })
        }
        else{
            geocode(req.query.address, (error, body) => {
                if(error)
                   res.send({
                       error // propery and value same so short hand
                   })
                else{   
                //console.log(data)
                const {latitude,longitude,location} = body
                
               forecast({
                   latitude,
                   longitude
               }, (error, {summary,temp,rain}) => { // use a name other than data for the parameter here else inner function cant access properties of top data
                   if(error)
                       res.send({error})
                   else{
                      res.send({
                          summary,temp,rain,
                          location
                      })
                   }
               })
           } })
           }
    })

app.get('/products', (req,res)=>{
    if(!req.query.search){
        res.send({
            error:'You must provide a search term!'
        })
    }
    else{ // else needed as we can't send 2 responses
    console.log(req.query.search)
    res.send({
        products:[]
    })
}
})

// format of query string is is url?key=value

app.get('/help/*', (req,res)=>{ // all unavailable links within help
    res.render('error', {
        err_msg: 'Help article not found!',
        title: '404 ERROR',
        name:'Nilesh Jain'
    })
})
app.get('*', (req,res) => { // * means anything that doesn't have a route so far. This has to be last route as it matches from all routes mentioned above.
    res.render('error', {
        err_msg: 'Page not found',
        title: '404 ERROR',
        name:'Nilesh Jain'
    })
    })


app.listen(3000, () => {
    console.log('Server is up on port 3000') // function that executes once listener notices service is up
}) // check on which port to listen for service to run. https/http services have default ports.

// html code can directly be provided on the text being sent to browser

// all files under public folder are the ones that get hosted