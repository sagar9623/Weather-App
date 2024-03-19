// JavaScript code for fetching weather data
const apiKey = 'e747bbcda5827986435ffe5b8f25b044';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.querySelector('#cityInput');
const searchBtn = document.querySelector('.searchButton');
const weatherIcon = document.querySelector('.weather-icon');
const errorMessage = document.querySelector('#errorMessage');
const suggestionsList = document.querySelector('#suggestions');

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    updateWeather(data);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    displayError();
  }
}

function updateWeather(data) {
  document.querySelector('.city').textContent = data.name;
  document.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°C`;
  document.querySelector('.humidity').textContent = `${data.main.humidity}%`;
  document.querySelector('.wind').textContent = `${data.wind.speed} km/h`;

  // Change weather icon based on weather condition
  switch (data.weather[0].main) {
    case 'Clouds':
      weatherIcon.src = 'weather-app-img/images/clouds.png';
      break;
    case 'Clear':
      weatherIcon.src = 'weather-app-img/images/clear.png';
      break;
    case 'Rain':
      weatherIcon.src = 'weather-app-img/images/rain.png';
      break;
    case 'Drizzle':
      weatherIcon.src = 'weather-app-img/images/drizzle.png';
      break;
    case 'Mist':
      weatherIcon.src = 'weather-app-img/images/mist.png';
      break;
    default:
      weatherIcon.src = 'weather-app-img/images/default.png';
  }

  document.querySelector('.weather').style.display = 'block';
  document.querySelector('.error').style.display = 'none';
}

function displayError() {
  document.querySelector('.weather').style.display = 'none';
  document.querySelector('.error').style.display = 'block';
}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
});
