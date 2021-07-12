//Date and time

function formatDate(date) {
  let dateNo = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  let day = days[date.getDay()];
  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];
  let month = months[date.getMonth()];

  return `${day}, ${month} ${dateNo} <div>${hour}:${minutes}</div>`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();

dateElement.innerHTML = formatDate(currentTime);

//////////////////// Search Engine and API

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiKey = "0f2efbf7da0a99fa73f8d244bcbbe2f5";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Calgary"); //this calls the city automatically when you open the page

//////////////// Geolocation API

function retrievePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "0f2efbf7da0a99fa73f8d244bcbbe2f5";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);
