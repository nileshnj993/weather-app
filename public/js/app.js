// this is only included as script in index.hbs as only that requires it to fetch weather data

console.log("Client side javascript code is loaded!")


// fetch from url, as its async we use .then and provide a callback function to store response value

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#location')
const messageTwo = document.querySelector('#forecast')
const messageThree = document.querySelector('#high')
const messageFour = document.querySelector('#low')

weatherForm.addEventListener('submit', (e) => {
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    e.preventDefault() // e stands for event. this prevents the refreshing
    const location = search.value // extracts value of the variable
   // console.log(location) // this only shows up for a split second as the web page refreshes upon form submission
    
    // this only works on local host -let url = 'http://localhost:3000/weather?address='+location
    let url = '/weather?address='+location
    messageOne.textContent = 'Loading...'
    fetch(url).then((response) => {
    response.json().then((data) => { // wait for json data to come then use it
       if(data.error){
         //  console.log(data.error)
         messageOne.textContent = data.error
       }
       else{
        // console.log('Location: '+data.address)
        // console.log('Forecast: '+data.summary)
        messageOne.textContent = data.location
        messageTwo.textContent = data.summary
        messageThree.textContent = 'Highest Temperature today was '+data.high
        messageFour.textContent = 'Lowest Temperature today was '+data.low
       }
    })
})

})