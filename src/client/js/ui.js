let x = 1;

function getInfo(){
    let data ={ 
        place: document.getElementById('place').value,
        departureDate: document.getElementById('departure-date').value,
        returnDate: document.getElementById('return-date').value
    }
    return data;
}

//displaying data on the screen
function displayData(data){
    console.log(data);
    document.querySelector('main').innerHTML += `<section id="section${x}">
                                                    <div class="trip">
                                                        <img src="${data.image.largeImageURL}" alt="Image">
                                                        
                                                        <div>
                                                            <h2>${data.place}</h2>
                                                            <h3>Departure Time: ${data.departureDate}</h3>
                                                            <h3>Return Time: ${data.returnDate}</h3>
                                                            <h3>Duration: ${data.tripDuration} days</h3>
                                                            <p>Your trip will start after ${data.fromNow} days</p>
                                                            <h3>Weather: </h3>
                                                            <p>High: ${data.highTemp}, Low: ${data.lowTemp}</p>
                                                            <p>${data.weatherSummary}</p>
                                                            <button class="remove" id="btn${x++}" type="button" value="submit">Remove</button>
                                                        </div>
                                                    </div>
                                                </section>`

}

//removing a trip
function removeTrip(){
    let allBtns = document.querySelectorAll('.remove')
    allBtns = Array.from(allBtns)

    allBtns.forEach(cur => {
        cur.addEventListener('click', function(){
            let sec = document.getElementById(`section${cur.id.slice(3)}`);
            if (sec.parentNode) {
                sec.parentNode.removeChild(sec);
            }
        })
    });
}

export { getInfo, displayData, removeTrip }