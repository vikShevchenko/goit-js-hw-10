import './css/styles.css';
import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

//---------------------------------------------------------
const refs = {
  inputForm: document.getElementById('search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

//--------------------------------------------------------
refs.inputForm.addEventListener('input', debounce(countries), DEBOUNCE_DELAY);

function countries() {
  name = refs.inputForm.value;

  fetchCountries(name)
    .then(data => {
      if (data.length > 10) {
        lotOfList();
      } else if (data.length < 10 && data.length != 1) {
        showList(data);
        refs.countryInfo.style.display = 'none'; 
        refs.countryList.style.display = 'block';
      } else if (data.length === 1) {
        countryCard(data);
        refs.countryList.style.display = 'none';
        refs.countryInfo.style.display = 'block';
      }
    })
    .catch(err => {
      refs.countryList.style.display = 'none';
      console.log(err);
      notFounde();
    });
}

//-------------------------------------------------------
function notFounde() {
  //Not found

  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function lotOfList() {
  // List
  Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name'
  );
}

function showList(data) {
  //showListCauntrys
  const marc = data
    .map(item => `<li><img src= ${item.flags.svg}> ${item.name.official}</li>`)
    .join('');
  refs.countryList.innerHTML = marc;
}

function countryCard(data) {
  //showCauntryCard
  const flag = data[0].flags.svg;
  const officialName = data[0].name.official;
  const capital = data[0].capital;
  const population = data[0].population;
  const language = Object.values(data[0].languages);

  refs.countryInfo.innerHTML = `
    <div class="count">
    <img src= ${flag} width="30" height="20">
    <h2>${officialName}</h2>
    </div>
    <h4>Capital: ${capital}</h4>
    <h4>Population: ${population}</h4>
    <h4>Lenguages: ${language}</h4>
    `;
}
