import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1';
const PARAMS = 'fields=name,capital,population,flags,languages';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}/name/${name}?${PARAMS}`)
    .then(response => {
      if (response.status === 404) {
        // явно відхиляємо проміс, щоб можна було зловити і обробити помилку
        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(error => {
      console.log('error', error);
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
};
