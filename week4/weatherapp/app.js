var cityinput = document.getElementById("cityinput")
var btn = document.getElementById("btn")
var apiKey ="e4db61856fd2f9ed47a6aa9cf1ce5616";
btn.addEventListener("click", function() {
  if (cityInput.value === "") {
    alert("Please enter a city name.");
    return;
  };
 var request = new XMLHttpRequest();
 var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}`;

 request.open('GET', url);
 request.onload = function() {
   if (request.status >= 200 && request.status < 400) {
     var responces = JSON.parse(request.responseText);
     renderWeatherInfo(responces);
   } else {
     alert("An error occurred.");
   }
 };

 request.onerror = function() {
   alert("An error occurred.");
 };

 request.send();
});

function renderWeatherInfo(data) {
  var infor = document.getElementById("weather-info");
  var weatherDesc = data.weather[0].description;
var temperature = (data.main.temp - 273.15).toFixed(2); 
  var windSpeed = data.wind.speed;
var weatherInfo = document.createElement("div");

  weatherInfo.innerHTML = `
    <p>The weather in ${data.name} is ${weatherDesc}.</p>
    <p>The temperature is ${temperature}°C and a wind speed of ${windSpeed} m/s.</p>
  `;

  var lineLength = weatherInfo.textContent.length * 10 + 20; 
  var line = document.createElement("hr");
  line.style.width = lineLength + "px";

  infor.prepend(weatherInfo);
  infor.prepend(line);
}
