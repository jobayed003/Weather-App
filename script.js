'use strict';

const main = document.getElementById('main');
const search = document.querySelector('.search');
const query = search.querySelector('.input-area');
const temp = document.getElementById('degree');

const format = document.getElementById('format');
const weatherStatus = document.querySelector('.weather-status');
const date = document.querySelector('.dates');
const city = document.querySelector('.city');
const day1 = document.querySelector('.day');

const nighttime = document.querySelectorAll('.night');
const daytime = document.querySelectorAll('.daylight');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind-status');
const visibility = document.querySelector('.visibility');
const airP = document.querySelector('.air-pressure');

const progressHumidity = document.querySelector('.range');
const icon = document.querySelector('.weather-icon');
const loader = document.querySelector('.spinner-container');
const day = document.querySelectorAll('.days');
const API_KEY = '6a983787c2b5ef2486f17fa63699454c';
const secondIcon = document.querySelectorAll('.icons');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const loadingSpinner = () => {
  loader.style.display = 'flex';
  main.style.display = 'none';
};

const removeSpinner = () => {
  if (!loader.hidden) {
    main.style.display = 'flex';
    loader.style.display = 'none';
  }
};

const changingTextcontent = data => {
  city.textContent = data.name;
  temp.textContent = Math.ceil(data.main.temp - 273);
  weatherStatus.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity + '%';
  wind.textContent = Math.ceil(data.wind.speed) + ' km/h';
  visibility.textContent = Math.ceil(data.visibility / 1000) + ' km';
  airP.textContent = data.main.pressure + ' mb';
  progressHumidity.style.width = `${data.main.humidity}%`;
  icon.src = `assets/${data.weather[0].icon}.png`;

  const now = new Date();
  const options = {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  };

  date.textContent = new Intl.DateTimeFormat('en-UK', options).format(now);
  day1.textContent = 'Today';
};

const changingDetails = data => {
  const options = {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  };
  data.daily.splice(1, 8).forEach((el, i) => {
    const formatedDate = new Date(el.dt * 1000);

    day[i].textContent = `${new Intl.DateTimeFormat('en', options).format(
      formatedDate
    )}`;

    daytime[i].textContent = Math.ceil(+el.temp.day - 273) + '°C';
    nighttime[i].textContent = Math.ceil(+el.temp.night - 273) + '°C';
    secondIcon[i].src = `assets/${el.weather[0].icon}.png`;
  });
};

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude: lat, longitude: long } = pos.coords;

      loadingSpinner();
      const weather = async () => {
        try {
          const resLoad = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
          );

          const data = await resLoad.json();

          changingTextcontent(data);

          const secondWeather = async () => {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${API_KEY}`
            );
            const data = await res.json();

            changingDetails(data);
            if (data) removeSpinner();
          };
          secondWeather();

          // Implementing the search results for searchig for location
          search.addEventListener('submit', e => {
            e.preventDefault();
            loadingSpinner();
            const searchResult = async () => {
              const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${query.value}&appid=${API_KEY}`
              );
              const data = await res.json();
              if (data) removeSpinner();
              changingTextcontent(data);
            };
            searchResult();

            const secondWeather = async () => {
              const res = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${query.value}&limit=5&appid=${API_KEY}`
              );
              const data = await res.json();
              const res2 = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=minutely&appid=${API_KEY}`
              );
              const data2 = await res2.json();
              changingDetails(data2);
              if (data) removeSpinner();
            };
            secondWeather();
          });
        } catch (err) {
          loadingSpinner();
        }
      };
      weather();
    },
    () =>
      alert(
        'Could not get your location, Please search for any cities :)',
        loadingSpinner()
      )
  );
}
