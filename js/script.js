'use strict';
import { searchWeather, searchResult } from './api.js';

import {
  changingTextcontent,
  changingDetails,
  loadingSpinner,
  removeSpinner,
  removeError,
  renderError,
} from './helper.js';

import * as name from './config.js';

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

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

          // Implementing the search results for searchig for location
          name.search.addEventListener('submit', e => {
            e.preventDefault();
            loadingSpinner();
            searchResult(name.query.value);
            searchWeather(name.query.value);
            name.query.value = '';
          });
        } catch (err) {
          loadingSpinner();
        }
      };

      name.searchField.addEventListener('submit', e => {
        e.preventDefault();
        removeError();
        loadingSpinner();
        searchResult(name.secondQuery.value);
        searchWeather(name.secondQuery.value);
        name.secondQuery.value = '';
      });
      weather();
    },
    () =>
      alert(
        'Could not get your location, Please search for any cities :)',
        loadingSpinner()
      )
  );
}
