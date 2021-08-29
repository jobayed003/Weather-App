'use strict';

import { searchWeather, searchResult } from './api.js';
import * as name from './config.js';
import {
  changingTextcontent,
  changingDetails,
  loadingSpinner,
  removeSpinner,
  removeError,
  renderError,
} from './helper.js';

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    pos => {
      const { latitude: lat, longitude: long } = pos.coords;

      loadingSpinner();
      const weather = async () => {
        try {
          const resLoad = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${name.API_KEY}`
          );
          const data = await resLoad.json();
          changingTextcontent(data);

          const secondWeather = async () => {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${name.API_KEY}`
            );
            const data = await res.json();
            changingDetails(data);
            if (data) removeSpinner();
          };
          secondWeather();
        } catch (err) {
          loadingSpinner();
        }
      };

      weather();
    },
    () => renderError('Could not get your location! Search for any city...')
  );
}

// Implementing the search results for searchig for location
name.search.addEventListener('submit', e => {
  e.preventDefault();
  loadingSpinner();
  searchResult(name.query.value);
  searchWeather(name.query.value);
  name.query.value = '';
});

name.searchField.addEventListener('submit', e => {
  e.preventDefault();
  removeError();
  loadingSpinner();
  searchResult(name.secondQuery.value);
  searchWeather(name.secondQuery.value);
  name.secondQuery.value = '';
});
