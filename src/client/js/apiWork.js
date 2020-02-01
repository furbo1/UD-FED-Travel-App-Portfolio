import { searchImages } from 'pixabay-api'

let apiData = []

async function getCoordinates(place){
    let coordinates = {}

    //getting coordinates from Geonames
    const geoname_url = 'http://api.geonames.org/';
    const geoname_username = 'al_razvan';
    const geoname_query = 'searchJSON?formatted=true&q=';
    const geoname_endpoint = geoname_url + geoname_query + place + '&username=' + geoname_username + '&style=full';

    await fetch(geoname_endpoint)
    .then(res => res.json())
    .then(res => {
        apiData[0] = res.geonames;
        coordinates.lat = res.geonames[0].lat;
        coordinates.lng = res.geonames[0].lng;
        console.log('Geoname => ', res)
    })
    .catch(err => console.log(err))

    return coordinates;
}

//getting weather information from the dark sky api
async function getWeather(lat, lng){
    let weather = {};

    const darkSky_url = 'https://api.darksky.net/forecast/';
    const darkSky_key = 'aff4bee4ad5f823051b1eaf6753fab6c/'
    const darkSky_endpoint = darkSky_url + darkSky_key + lat + ',' + lng

    await fetch('/api/darksky', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ darkSky_endpoint: darkSky_endpoint }),
    })
    .then(res => res.json())
    .then(res => {
        apiData[1] = res;
        console.log('Dark Sky => ', res)
        if(weather.fromNow > 7){
            weather.summary = res.daily.summary
            weather.highTemp = res.daily.data[7].temperatureHigh
            weather.lowTemp = res.daily.data[7].temperatureLow
        } else {
            weather.summary = res.daily.summary
            weather.highTemp = res.daily.data[0].temperatureHigh
            weather.lowTemp = res.daily.data[0].temperatureLow
        }
    })
    .catch(error => console.log(error))

    return weather
}

//getting image from the pixabay api
async function getPicture(place){
    let img = {};

    const pixabay_key = '14964570-16eaede65be3093b01f90f685'
    await searchImages(pixabay_key, place)
    .then(res => {
        apiData[2] = res.hits
        console.log('Pixabay => ', res)
        img.img = res.hits[0]
    })

    return img;
}

export { getCoordinates, getWeather, getPicture, apiData }