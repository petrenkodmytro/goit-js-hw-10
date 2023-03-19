import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.getElementById('search-box');
const listCountryRef = document.querySelector('.country-list');
const cardCountryRef = document.querySelector('.country-info');

inputRef.addEventListener(
  'input',
  debounce(onSearchCountryInput, DEBOUNCE_DELAY)
);

function onSearchCountryInput() {
  const nameCountry = inputRef.value.trim();
  // console.log(nameCountry);

  listCountryRef.innerHTML = '';
  cardCountryRef.innerHTML = '';

  // якщо input пустий пошук не виконуємо
  if (nameCountry === '') {
    return;
  }

  fetchCountries(nameCountry)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
    
      renderPage(countries);
      // console.log(countries);
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function renderPage(arr) {
  if (arr.length === 1) {
    renderOneCountry(arr);
  } else {
    renderListCountries(arr);
  }
}

function renderOneCountry(arr) {
  const { name, capital, population, flags, languages } = arr[0];
  const markup = `<img src="${flags.svg}" alt="${name.official}" width="100">
   <h2>${name.official}</h2>
   <p>Capital: <b>${capital}</b></p>
   <p>Population: <b>${population}</b></p>
   <p>Languages: <b>${Object.values(languages)}</b></p>`;

  cardCountryRef.insertAdjacentHTML('beforeend', markup);
}

function renderListCountries(arr) {
  const markupList = arr.reduce((acc, { name, flags }) => {
    return (
      acc +
      `<li>
<img src="${flags.svg}" alt="${name.official}" width="30">
<span>${name.official}</span>
</li>`
    );
  }, '');

  listCountryRef.insertAdjacentHTML('beforeend', markupList);
}
