import {
  renderError,
  changingTextcontent,
  changingDetails,
  loadingSpinner,
  removeSpinner,
} from './helper.js';
import * as name from './config.js';

// export const weather = async (lat, long) => {
//   try {
//     const resLoad = await fetch(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${name.API_KEY}`
//     );

//     const data = await resLoad.json();

//     changingTextcontent(data);

//     const secondWeather = async () => {
//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&appid=${name.API_KEY}`
//       );
//       const data = await res.json();

//       changingDetails(data);
//       if (data) removeSpinner();
//     };
//     secondWeather();

//     // Implementing the search results for searchig for location
//     name.search.addEventListener('submit', e => {
//       e.preventDefault();
//       loadingSpinner();
//       searchResult(name.query.value);
//       searchWeather(name.query.value);
//       name.query.value = '';
//     });
//   } catch (err) {
//     loadingSpinner();
//   }
// };

export const searchResult = async query => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${name.API_KEY}`
    );
    const data = await res.json();
    if (!data) return;
    if (!changingTextcontent(data)) removeSpinner();
    changingTextcontent(data);
  } catch (err) {
    console.log(err.message);
    renderError();
  }
};

export const searchWeather = async query => {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${name.API_KEY}`
    );
    if (!res) return;
    const data = await res.json();
    const res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&exclude=minutely&appid=${name.API_KEY}`
    );
    const data2 = await res2.json();
    // if (!changingDetails(data2)) loadingSpinner();
    changingDetails(data2);
    removeSpinner();
  } catch (err) {
    renderError();
    console.log(err.message);
  }
};
