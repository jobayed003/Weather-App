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

export const changingTextcontent = data => {
  name.city.textContent = data.name;
  name.temp.textContent = Math.ceil(data.main.temp - 273);
  name.weatherStatus.textContent = data.weather[0].description;
  name.humidity.textContent = `${data.main.humidity}%`;
  name.wind.textContent = `${Math.ceil(data.wind.speed)} km/h`;
  name.visibility.textContent = `${Math.ceil(data.visibility / 1000)} km`;
  name.airP.textContent = `${data.main.pressure} hPa`;
  name.progressHumidity.style.width = `${data.main.humidity}%`;
  name.icon.src = `assets/${data.weather[0].icon}.png`;

  const now = new Date();
  const options = {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  };

  name.date.textContent = new Intl.DateTimeFormat('en-UK', options).format(now);
  name.day1.textContent = 'Today';
};

export const changingDetails = data => {
  const options = {
    day: 'numeric',
    month: 'short',
    weekday: 'short',
  };
  data.daily.splice(1, 7).forEach((el, i) => {
    const formatedDate = new Date(el.dt * 1000);
    name.day[i].textContent = `${new Intl.DateTimeFormat('en', options).format(
      formatedDate
    )}`;

    name.daytime[i].textContent = `${Math.ceil(+el.temp.day - 273)}°C`;
    name.nighttime[i].textContent = `${Math.ceil(+el.temp.night - 273)}°C`;
    name.secondIcon[i].src = `assets/${el.weather[0].icon}.png`;
  });
  name.day[0].textContent = 'Tommorrow';
};
