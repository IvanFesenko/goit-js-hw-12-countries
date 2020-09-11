// import './notify';
// import fetchCountries from './fetchCountries';
import { alert, notice, info, success, error } from '@pnotify/core';
import selectListTemplate from '../templates/countrySelectList.hbs';
import selectedCountryTemplate from '../templates/selectedCountry.hbs';

const refs = {
  input: document.querySelector('.inputCountry'),
  selectedCountry: document.querySelector('.selected-country'),
  countrySelectList: document.querySelector('.country-select__list'),
};
const debounce = require('lodash.debounce');
refs.input.addEventListener('keyup', debounce(onChangeInput, 500));

function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка по адресу ${url}, 
      статус ошибки ${response.status}!`);
    })
    .catch(err => {
      throw new Error(err);
    });
}

function onChangeInput(event) {
  clearSelectList();
  clearSelectedCountry();
  const val = event.target.value;

  if (!val.length) return;
  fetchCountries(val).then(countries => processResult(countries));
}

function processResult(countries) {
  //delete
  console.log(countries);
  //delete
  if (countries.length === 1) {
    generetaSelectedCountry(countries[0]);
  } else if (countries.length > 1 && countries.length < 11) {
    refs.countriesList = countries;
    generateCountrySelectList(countries);
  } else {
    console.log('error');
    const myError = error({
      text: "I'm an error message.",
    });
    console.log(myError);
  }
}

function generateCountrySelectList(data) {
  const layout = selectListTemplate(data);
  refs.countrySelectList.insertAdjacentHTML('beforeend', layout);
  refs.countrySelectList.addEventListener('click', onSelectCountry);
}

function onSelectCountry(event) {
  if (event.target.nodeName !== 'LI') {
    return;
  }
  refs.input.value = event.target.textContent;
  clearSelectedCountry();
  generetaSelectedCountry(refs.countriesList[event.target.dataset.index]);
}

function generetaSelectedCountry(data) {
  const layout = selectedCountryTemplate(data);
  refs.selectedCountry.insertAdjacentHTML('beforeend', layout);
}

function clearSelectList() {
  refs.countrySelectList.innerHTML = '';
}

function clearSelectedCountry() {
  refs.selectedCountry.innerHTML = '';
}
