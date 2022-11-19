import './css/styles.css';



const debounce = require('lodash.debounce');

const refs = {
  inputForm: document.getElementById('search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};

const DEBOUNCE_DELAY = 1000;

refs.inputForm.addEventListener(
  'input',
  debounce(
    (countries = () => {
      const name = refs.inputForm.value;

      fetchCountries(name);
    }),
    DEBOUNCE_DELAY
  )
);

//fetchCountries;
function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(name => {
      if (!name.ok) {
        throw new Error(name.statusText);
      }

      return name.json();
    })
    .then(data => { console.log(data);

    const marcup = countryCard(data);

    });
}  




//function showCauntry (na)

    function countryCard(data) {
      
      const flag = data[0].flags.svg;
      const officialName = data[0].name.official;
      const capital = data[0].capital;
      const population = data[0].population;
      const language = Object.values(data[0].languages);
      

      refs.countryInfo.innerHTML = `
      <div class="count">
      <img src= ${flag} width="30">
      <h2>${officialName}</h2>
      </div>
      <h4>${capital}</h4>
      <h4>${population}</h4>
      <h4>${language}</h4>
      `
    
    }
    // console.log(country)


