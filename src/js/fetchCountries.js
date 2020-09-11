export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка по адресу ${url}, 
      статус ошибки ${response.status}!`);
    },
  );
  // .catch(err => {
  //   throw new Error(err);
  // });
}
