import { displayData, removeTrip, getInfo } from './ui'
import { processDates } from './processData'
import { getCoordinates, getWeather, getPicture, apiData } from './apiWork'

async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let data = getInfo();

    //Process Date
    let x = processDates(data.departureDate, data.returnDate);
    
    //This is the processed data which will be shown to the user
    let processedData = {
        place: data.place,
        departureDate: x.depDate,
        returnDate: x.retDate,
        tripDuration: x.diff,
        fromNow: x.fromNow,
    }

    console.log("::: Form Submitted :::")

    //Geoname
    await getCoordinates(data.place)
    .then(res => {
        processedData.lat = res.lat;
        processedData.lng = res.lng;
    })
    .catch (err => console.log(err));

    //Dark Sky
    await getWeather(processedData.lat, processedData.lng)
    .then(res => {
        processedData.weatherSummary = res.summary;
        processedData.highTemp = res.highTemp;
        processedData.lowTemp = res.lowTemp;
    })
    .catch(res => console.log(err))

    //Pixabay
    await getPicture(data.place)
    .then(res => {
        processedData.image = res.img;
    })
    .catch(res => console.log(err))

    //Sending the trip data to the server side
    console.log(processedData);
    fetch('/api/sendData', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ processedData: processedData }),
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))

    //Displaying data on screen
    processedData.id += 1;
    displayData(processedData);

    //Remove trip
    removeTrip();
}

export { handleSubmit }
