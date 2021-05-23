function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
    }
    forecastHTML =
      forecastHTML +
      `
         <div class="col-2">
                            <div class="weather-forcast-date">${formatDay(
                              forecastDay.dt
                            )}</div>
                            <img src="http://openweathermap.org/img/wn/${
                              forecastDay.weather[0].icon
                            }@2x.png" alt=""
                            width="42"
                            />
                            <div class="weather-forecast-temperature">
                           <span class="weather-forecast-temperature-max" > ${Math.round(
                             forecastDay.temp.max
                           )}°</span>
                        <span class="weather-forecast-temperature-min">
                         ${Math.round(forecastDay.temp.min)}° </span>
                         </div>
                    </div>
                `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "1e1608b187f39199c366f0fe75766dde";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {

    
    let temperatureElement = document.querySelector("#temperature");
    let cityElement =document.querySelector("#city");
    let descriptionElement =document.querySelector("#description");
    let humidityElement= document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

  

    fahrenheitTemperature = response.data.main.temp;


    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt" , response.data.weather[0].description);

    getForecast(response.data.coord);

}

function search(city) {
    let apiKey =  "1e1608b187f39199c366f0fe75766dde"
    let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayTemperature);
} 


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}




let form = document.querySelector("#search-form");
form.addEventListener("submit" , handleSubmit);





search("New York");