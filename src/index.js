/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};*/

// write your code here
/*let city = prompt("Enter a city");
city = city.trim().toLowerCase();
//weather is the object
//weather["oslo"] - weather of oslo
//weather["sydney"] === undefined - there is no sydney, so returns true

if (weather[city] !== undefined) {
  let temp = weather[city].temp;
  let humidity = weather[city].humidity;
  let celsiusTemp = Math.round(temp);
  let fahrenheitTemp = Math.round((temp * 9) / 5 + 32);
  alert(
    `It is currently ${celsiusTemp}°C (${fahrenheitTemp}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}
*/
function formatDate(today) {
  let year = today.getFullYear();
  let date = today.getDate();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[today.getMonth()];

  let formatOutput = `${day}, ${date} ${month} ${year} `;
  return formatOutput;
}

function formatTime(now) {
  let hours = now.getHours();
  let minutes = now.getMinutes();

  function addZero(input) {
    if (input < 10) {
      let format = `0${input}`;
      return format;
    } else {
      return input;
    }
  }

  let hour = addZero(hours);
  let minute = addZero(minutes);

  let formatOutput = `${hour}:${minute}`;
  return formatOutput;
}

let now = new Date();
let currentDate = formatDate(now);
let currentTime = formatTime(now);

let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = currentDate + currentTime;

function changeTempUnit(event) {
  event.preventDefault();
  let unit = document.querySelector("#temp-unit");
  if (unit.innerHTML === "C") {
    unit.innerHTML = "F";
  } else if (unit.innerHTML === "F") {
    unit.innerHTML = "C";
  }

  let temp = document.querySelector("#temperature");
  let fahrenheitTemp = Math.round((temp.innerHTML * 9) / 5 + 32);
  let celsiusTemp = Math.round(((temp.innerHTML - 32) * 5) / 9);

  if (unit.innerHTML === "F") {
    temp.innerHTML = fahrenheitTemp;
  } else if (unit.innerHTML === "C") {
    temp.innerHTML = celsiusTemp;
  }
}

let unit = document.querySelector("#temp-unit");
unit.addEventListener("click", changeTempUnit);

function showCity(response) {
  let currentCity = document.querySelector("#city");
  currentCity.innerHTML = response.data.name;
}

function showTemp(response) {
  let currentTemp = document.querySelector("#temperature");
  let newTemp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = newTemp;
}

function searchCity(city) {
  let apiKey = "3810dff5d8ae5397d576e2855f53b531";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCity);
  axios.get(apiURL).then(showTemp);
}

function processSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar").value;
  searchCity(searchInput);
}

let searchButton = document.querySelector("#search-btn");
searchButton.addEventListener("click", processSearch);

function showCurrentLocationWeather(response) {
  let currentCity = document.querySelector("#city");
  let currentTemp = document.querySelector("#temperature");
  let currentLocationName = response.data.name;
  let currentLocationTemp = Math.round(response.data.main.temp);
  currentCity.innerHTML = currentLocationName;
  currentTemp.innerHTML = currentLocationTemp;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3810dff5d8ae5397d576e2855f53b531";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCurrentLocationWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-btn");
currentLocationButton.addEventListener("click", getCurrentPosition);

searchCity("Hong Kong");
