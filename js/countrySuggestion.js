// getting all required elements
import * as name from './config.js';

// if user press any key and release
name.query.onkeyup = e => {
  let userData = e.target.value;
  let emptyArray = [];

  if (userData) {
    emptyArray = name.countries.filter(data => {
      // Filtering values of the emtpty array
      return data.toLowerCase().startsWith(userData.toLowerCase());
    });

    emptyArray = emptyArray.map(data => {
      return (data = '<li>' + data + '</li>');
    });
    showSuggestions(emptyArray);
    name.suggBox.classList.remove('hidden');
    const allList = name.suggBox.querySelectorAll('li');

    allList.forEach(el => {
      el.addEventListener('click', () => {
        let selectUserData = el.textContent;
        name.query.value = selectUserData;
        console.log(name.query.value);
        name.suggBox.classList.add('hidden');
      });
    });
  } else {
    name.suggBox.classList.add('hidden');
  }
};

const showSuggestions = list => {
  let listData;
  if (!list.length) {
    let userValue = name.query.value;
    listData = '<li>' + userValue + '</li>';
  } else {
    listData = list.join('');
  }
  name.suggBox.innerHTML = listData;
};

name.secondQuery.onkeyup = e => {
  let userData = e.target.value;
  let emptyArray = [];

  if (userData) {
    emptyArray = name.countries.filter(data => {
      // Filtering values of the emtpty array
      return data.toLowerCase().startsWith(userData.toLowerCase());
    });
    emptyArray = emptyArray.map(data => {
      return (data = '<li>' + data + '</li>');
    });
    showSuggestions2(emptyArray);

    name.suggBox2.classList.remove('hidden');
    const allList = name.suggBox2.querySelectorAll('li');

    allList.forEach(el => {
      el.addEventListener('click', () => {
        let selectUserData = el.textContent;
        name.secondQuery.value = selectUserData;
        console.log(name.secondQuery.value);
        name.suggBox2.classList.add('hidden');
      });
    });
  } else {
    name.suggBox2.classList.add('hidden');
  }
};

const showSuggestions2 = list => {
  let listData;
  if (!list.length) {
    let userValue = name.secondQuery.value;
    listData = '<li>' + userValue + '</li>';
  } else {
    listData = list.join('');
  }
  name.suggBox2.innerHTML = listData;
};
