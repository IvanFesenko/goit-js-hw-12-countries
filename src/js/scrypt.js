// import './notify';
import fetchCountries from './fetchCountries';
import selectListTemplate from '../templates/countrySelectList.hbs';
import selectedCountryTemplate from '../templates/selectedCountry.hbs';

const refs = {
  input: document.querySelector('.inputCountry'),
  selectedCountry: document.querySelector('.selected-country'),
  countrySelectList: document.querySelector('.country-select__list'),
};
const debounce = require('lodash.debounce');

refs.input.addEventListener('keyup', debounce(onChangeInput, 500));

function onChangeInput(event) {
  clearSelectList();
  const val = event.target.value;

  if (!val.length) return;
  fetchCountries(val).then(countries => processResult(countries));
}

function processResult(countries) {
  console.log(countries);
  if (countries.length === 1) {
    generetaSelectedCountry(countries[0]);
  } else if (countries.length > 1 && countries.length < 11) {
    generateCountrySelectList(countries);
  } else {
    console.log('error');
  }
}

function generateCountrySelectList(data) {
  const layout = selectListTemplate(data);
  refs.countrySelectList.insertAdjacentHTML('beforeend', layout);
}

function generetaSelectedCountry(data) {
  const layout = selectedCountryTemplate(data);
  refs.selectedCountry.insertAdjacentHTML('beforeend', layout);
}

function clearSelectList() {
  refs.countrySelectList.innerHTML = '';
}
