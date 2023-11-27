const searchBtn = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const dataDump = document.getElementById("data-dump");

const apiKEY = "a92f9030e876e91ef59c827f2a52e699";

// // functions work, button does not.
// searchBtn.addEventListener("onclick", async (event)=>{
//     console.log("clicked");
//     await loadData(event);
// })

// // searchBtn.onclick = loadData

// Fetchs lat and lon of city
const getData = async (city) =>{
        //    Wait for axios Promise to fullfill API fetch
    let response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=100&appid=${apiKEY}`)

    console.log(response)
    console.log(response.data)

    return response.data
}

// Get lat and lon and makes api call.
const loadData = async (event)=>{

    event.preventDefault();

    let info = await getData(cityInput.value);

    dataDump.innerText = info;

    let latitude = Math.round(info[0]["lat"]*100)/100;
    let longitude = Math.round(info[0]["lon"]*100)/100;

    console.log(latitude, longitude);

    let weatherInfo = await getDataByCoords(latitude, longitude)

    let description = weatherInfo["weather"][0]["description"]

    let highTemp = weatherInfo["main"]["temp_max"]
    let lowTemp = weatherInfo["main"]["temp_min"]
    let humidity = weatherInfo["main"]["humidity"]

    dataDump.innerHTML=`Forcast:<br>
                        ${description}<br>
                        High Today: ${highTemp} °F<br>
                        Low Today: ${lowTemp} °F<br>
                        Humidity: ${humidity}%`
    console.log(weatherInfo)
}

// API call for city info by latitude and longitude
const getDataByCoords = async (lat, lon)=>{
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKEY}&units=imperial`)


    console.log(response)
    console.log(response.data)

    return response.data
}

