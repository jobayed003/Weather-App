import * as name from './config.js';

export const loadingSpinner = () => {
  name.loader.style.display = 'flex';
  name.main.style.display = 'none';
};

export const removeSpinner = () => {
  if (!name.loader.hidden) {
    name.main.style.display = 'flex';
    name.loader.style.display = 'none';
  }
};

export const renderError = message => {
  name.loader.style.display = 'none';
  name.main.style.display = 'none';
  name.errorMessage.classList.remove('hidden');
  name.errorMessage.classList.add('active');
  name.error.textContent = '';
  name.error.textContent = message;
};

export const removeError = () => {
  name.loader.style.display = 'none';
  name.main.style.display = 'flex';
  name.errorMessage.classList.add('hidden');
  name.errorMessage.classList.remove('active');
};

let detailsData = [];
let temp;
let formula1;

const now = new Date();
const options = {
  day: 'numeric',
  month: 'short',
  weekday: 'short',
};

export const changingTextcontent = data => {
  name.city.textContent = data.name;
  const convertedTemp = Math.ceil(data.main.temp - 273);
  const formula = convertedTemp * 1.8 + 32;
  temp = convertedTemp;
  formula1 = formula;

  name.format.textContent = 'C';
  name.temp.textContent = convertedTemp;

  name.weatherStatus.textContent = data.weather[0].description;
  name.humidity.textContent = `${data.main.humidity}%`;
  name.wind.textContent = `${Math.ceil(data.wind.speed)} km/h`;
  name.visibility.textContent = `${Math.ceil(data.visibility / 1000)} km`;
  name.airP.textContent = `${data.main.pressure} hPa`;
  name.progressHumidity.style.width = `${data.main.humidity}%`;
  name.icon.src = `assets/${data.weather[0].icon}.png`;

  name.date.textContent = new Intl.DateTimeFormat('en-UK', options).format(now);
  name.day1.textContent = 'Today';
};

export const changingDetails = data => {
  changingFormat(data, 'C');
};

const changingFormat = (data, format) => {
  const finalData = data.daily.slice(1, 8);
  finalData.forEach((el, i) => {
    const formatedDate = new Date(el.dt * 1000);
    name.day[i].textContent = `${new Intl.DateTimeFormat('en', options).format(
      formatedDate
    )}`;

    const kelvinToFahrenDay = Math.ceil((el.temp.day - 273) * 1.8 + 32);
    const kelvinToFahrenNight = Math.ceil((el.temp.night - 273) * 1.8 + 32);

    const kelvinToCelciusDay = Math.ceil(el.temp.day - 273);
    const kelvinToCelciusNight = Math.ceil(el.temp.night - 273);

    name.dayTime[i].textContent = `${
      format === 'C' ? kelvinToCelciusDay : kelvinToFahrenDay
    }°${format}`;
    name.nightTime[i].textContent = `${
      format === 'C' ? kelvinToCelciusNight : kelvinToFahrenNight
    }°${format}`;

    name.secondIcon[i].src = `assets/${el.weather[0].icon}.png`;
  });
  name.day[0].textContent = 'Tommorrow';

  detailsData = data;
};

// Adding handler
// Changing The Format when click happen!
const changeToCelcius = convertedTemp => {
  name.format.textContent = 'C';
  name.temp.textContent = convertedTemp;
  changingFormat(detailsData, 'C');
};

const changeToFahrenheit = formula => {
  name.format.textContent = 'F';
  Math.ceil((name.temp.textContent = Math.ceil(formula)));
  changingFormat(detailsData, 'F');
};

name.format.addEventListener('click', () => {
  if (name.format.textContent === 'C') {
    changeToFahrenheit(formula1);
  } else {
    changeToCelcius(temp);
  }
});
