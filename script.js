const main = document.getElementById("main");
const input = document.querySelector(".input-area");
const temp = document.getElementById("degree");
const format = document.getElementById("format");
const weatherStatus = document.querySelector(".weather-status");
const date = document.querySelector(".dates");
const city = document.querySelector(".city");
const day = document.querySelectorAll(".days");
const day1 = document.querySelector(".day");
const nighttime = document.querySelectorAll(".night");
const daytime = document.querySelectorAll(".daylight");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind-status");
const visibility = document.querySelector(".visibility");
const airP = document.querySelector(".air-pressure");
const progressHumidity = document.querySelector(".range");
const icon = document.querySelector(".weather-icon");
const loader = document.querySelector(".spinner-container");

const API_KEY = "6a983787c2b5ef2486f17fa63699454c";

const loadingSpinner = () => {
  loader.style.display = "flex";
  main.style.display = "none";
};

const removeSpinner = () => {
  if (!loader.hidden) {
    main.style.display = "flex";
    loader.style.display = "none";
  }
};
loadingSpinner();

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      console.log(pos);
      const { latitude: lat, longitude: long } = pos.coords;

      const weather = async () => {
        try {
          removeSpinner();
          const corsApi = "https://cors-anywhere.herokuapp.com/";
          const res = await fetch(
            // `${corsApi}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`

            // https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=hourly,daily&appid=${API_KEY}` // https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`

            //     `${corsApi}https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`
            //   );
          );
          const data = await res.json();

          console.log(data);

          city.textContent = data.name;
          temp.textContent = Math.ceil(data.main.temp - 273);
          weatherStatus.textContent = data.weather[0].description;
          humidity.textContent = data.main.humidity + "%";
          wind.textContent = Math.ceil(data.wind.speed) + " km/h";
          visibility.textContent = data.visibility / 1000 + " km";
          airP.textContent = data.main.pressure + " mb";
          progressHumidity.style.width = `${data.main.humidity}%`;
          icon.src = `assets/${data.weather[0].icon}.png`;

          const now = new Date();
          const options = {
            day: "numeric",
            month: "numeric",
            year: "numeric",
            weekday: "long",
          };

          date.textContent = new Intl.DateTimeFormat("en-UK", options).format(
            now
          );
          day1.textContent = "Today";
        } catch (err) {
          removeSpinner();
        }
      };
      weather();
    },
    () =>
      alert(
        "Could not get your location, Please search for any cities :)",
        loadingSpinner()
      )
  );
}

//   const res = await fetch(
//     `${corsApi}https://api.openweathermap.org/data/2.5/forecast?q=${[
//       lat,
//       long,
//     ]}&appid=${apiKey}`
//   );
