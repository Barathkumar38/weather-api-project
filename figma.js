//Get all necessary elements from the DOM

const app = document.querySelector('.weather-app');

const temp = document.querySelector('.temp');

const dateOutput = document.querySelector('.date');

const timeOutput = document.querySelector('.time');

const conditionOutput = document.querySelector('.condition');

const nameOutput = document.querySelector('.name');

const icon = document.querySelector('.icon');

const cloudOutput = document.querySelector('.cloud');

const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
 const form = document.getElementById('locationInput');
  const search = document.querySelector('.search'); 
  const btn = document.querySelector('.submit'); 
  const cities = document.querySelectorAll('.city');

//Default city when the page Loads 
let cityInput = "London";
//Add click even to each city in pannel
cities.forEach((city) => { 
    city.addEventListener('click', (e) => {

    //Change from default city to the clicked one 
    cityInput = e.target.innerHTML;
    
    //*Function that fetches and displays all the data from the Weather API (We will write it soon) "/
    
    fetchweatherData();
     //Fade out the app (simple animation)
    
    app.style.opacity= "0";
    });
    })
    //Add submit event to the form

form.addEventListener('submit', (e) => {

    /*If the input field (search bar) is empty, throw an alert*/ 
    if(search.value.length == 0) { 
        alert('Please type in a city name');
    
    } else {
    
    /*Change from default city to the
    
    one written in the input field*/
    
    cityInput = search.value;
    
    /*Function that fetches and displays all the data from the Weather API (We will write it soon)"*/
    
    fetchweatherData();
    
    //Remove all text from the input field 
    search.value = "";
    
    //Fade out the opp (simple animation)
    
    app.style.opacity= "0";
    
    }
    //Prevents the default behaviour of the form
     e.preventDefault();

});

/*Function that returns a day of the week (Monday, Tuesday, Friday...) from a date (12 03 2821) We will use this function Later*/

function dayOfTheWeek (day, month, year) {

const weekday = [

"Sunday",

"Monday",

"Tuesday",

"Wednesday",

"Thursday",

"Friday",

"Saturday"

];

return weekday [new Date(`$(day}/${month}/${year}`).getDay()];
};
/*Function that fetches and displays

the data from the weather API*/

function fetchWeatherData() {
    /*Fetch the data and dynamicaly add the city name with template Literals/ /"USE YOUR OWN KEY*/

fetch(
    $ curl "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"

    
)
    {
      "current_weather"; {
        "time"; "2022-01-01T15:00"
        "temperature"; 2.4, "weathercode"; 3,
        "windspeed"; 11.9, "winddirection"; 95.0,
      },
      "hourly"; {
        "time"; ["2022-07-01T00:00","2022-07-01T01:00, ..."]
        "windspeed_10m"; ["3.16,3.02,3.3,3.14,3.2,2.95, ..."],
        "temperature_2m"; ["13.7,13.3,12.8,12.3,11.8, ..."],
        "relativehumidity_2m"; [82,83,86,85,88,88,84,76, ...],
      }
    }
    High Resolution
    Open-Meteo combines global (11 km) and mesoscale (1 km) weather models from national weather services into one seamless prediction. For every location on earth, the best forecast is available.
    
    Weather data are provided in hourly resolution with 7 days forecast. Typically, the first 2-3 days are calculated with high resolution local weather models, followed by global weather models with up to 16 days of forecast. Our APIs integrate data seamlessly to offer a simple hourly weather forecast.
    
    Rapid Updates
    To continuously correct weather forecasts, our local models update every hour. Open-Meteo forecasts are always up to date and capture recent changes in rain radars.
    
    Weather models use real-time measurements, airplane data, buoys, radar and satellite observations for numerical weather predictions. With hourly updates, weather analysis is superior to simple measurement stations.
    
    
    )
}

/*Take the data (Which is in JSON format) and convert it to a regular JS object*/

.then(response => response.json())

.then(data => {

/*You can console Log the data to see what is available*/

console.log(data);

/*Let's start by adding the temperature and weather condition to the page*/
temp.innerHTML = data.current.temp_c + "&#176;"

temp.innerHTML = data.current.temp_c + "&#176;";
 conditionOutput.innerHTML = data.current.condition.text;

/* Get the date and time from the city and extract the day, month, year and time into individual variables*/
 const date = data.location.localtime; 
 const y = parseInt(date.substr(0, 4));
 const m = parseInt(date.substr(5, 2)); 
 const d = parseInt(date.substr(8, 2));

const time = date.substr(11);

/*Reformat the date into somehing more appealing and add it to the page*/

/*Original format: 2021-10-09 17:53"/

/*New Format: 17:53 - Friday 9, 10 2021*/

dateOutput.innerHTML = `${dayOfTheWeek (d, m, y)} ${d}, ${m} ${y}`;
timeOutput.innerHTML = time;

/*Add the name of the city into the page*/

nameOutput.innerHTML = data.location.name;

/*Get the corresponding icon url for the weather and extract a part of it*/

const iconId = data.current.condition.icon.substr(

"//cdn.weatherapi.com/weather/64x64/".length);

/*Reformat the icon url to your own Local folder path and add it to the page*/

icon.src="./icons/" + iconId;

//*Add the weather details to the page*//

cloudOutput.innerHTML = data.current.cloud + "%";

humidityOutput.innerHTML = data.current. humidity + "%";

windOutput.innerHTML = data.current.wind_kph +"km/h";


//Set default time of day

let timeOfDay = "day";

//Get the unique id for each weather condition */
const code = data.current.condition.code;

//Change to night if its night time in the city

if(!data.current.is_day) {

timeOfDay="night";
}
if(code ==1000) {

    /*Set the background image to clear if the weather is clear*/
    
    app.style.backgroundImage =`
    
    url(./images/${timeOfDay}/clear.jpg)`;
    
    /*Change the button bg color depending on if its day or night*/
     btn.style.background = "#e5ba92";
     if(timeOfDay == "night"){
       
             btn.style.background = "#181e27";

    }
}
    /*Same thing for cloudy weather*/
    
    else if (
    
    code == 1003 ||
    
    code== 1006 ||
    
    code== 1009 ||
    
    code == 1030 || 
    code == 1069 ||
    
    code == 1087 || 
    code== 1135 ||
    
    code == 1273 ||
    
    code == 1276 ||
    
    code == 1279 ||
    
    code == 1282
    ){
    app.style.backgroundImage =
    `url(./images/${timeOfDay}/cloudy.jpg)`;
    btn.style.background="#fa6d1b";
     if(timeOfDay == "night") { 
         btn.style.background = "#181e27";
    
    }

    //*And rain*//
    
     } else if (
    
    code == 1063 ||
    
    code == 1069 ||
    
    code == 1872 ||
    
    code == 1150 ||
    
    code ==1153 ||
    
    code== 1188 ||
    
    code == 1183 ||
    
    code == 1186 ||
    
    code == 1189 ||
    
    code == 1192 ||
    
    code == 1195 ||
    
    code == 1204 ||
    
    code == 1207 ||
    
    code == 1240 ||
    code == 1243 ||
    code == 1246 ||
    code == 1249 ||

     code == 1252

 ){

app.style.backgroundImage =`url(./images/${timeOfDay}/rainy.jpg)`; 
btn.style.background ="#647d75"; 
if(timeOfDay == "night") {

    
    
    btn.style.background="#32c80";
    
    }}
    
    /* And finnaly...Snow*/
    
    else {
    
    
app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
btn.style.background= "#4d72aa";

if(timeOfDay == "night") { 
    btn.style.background="#1b1b1b";

} }

//*Fade in the page once all is done*//
app.style.opacity = "1";

})

/*If the user types a city that doesn't exist,

throw an alert*/ 
.catch(() => {

alert('City not found, please try again');

app.style.opacity = "1";

});

}

//Call the function on page Load */
fetchWeatherData();

//*fade in the page
app.style.opacity="1";  