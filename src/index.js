import './css/styles.css';
//---------------------------------------------------------
const debounce = require('lodash.debounce');
//---------------------------------------------------------
const refs = {
  inputForm: document.getElementById('search-box'),
  countryInfo: document.querySelector('.country-info'),
  countryList: document.querySelector('.country-list'),
};
//--------------------------------------------------------
const DEBOUNCE_DELAY = 300;
//--------------------------------------------------------
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
//-------------------------------------------------------

function fetchCountries(name) {
  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then(name => {
      if (!name.ok) {

        throw new Error(name.statusText);

      }

      return name.json();
    })
    .then(data => {


      if (data.length > 10) {
      
        lotOfList();

      } else if (data.length < 10 && data.length != 1) {
       
        showList(data);
        

      } else if (data.length == 1) {
        
        countryCard(data);
        refs.countryList.style.display = "none";

      }


    }).catch(err => {
      console.log(err);
      notFounde();
    })
}
//-------------------------------------------------------
function notFounde() {         //Not found
  
  refs.countryList.innerHTML = `<span class = "spanErr"> Oops, there is no country with that name"</span>`
  
}

function lotOfList()         // List
{

  refs.countryList.innerHTML = `<span class = "norm" >Too many matches found. Please enter a more specific name.</span>`
 
}

function showList(data) {     //showListCauntrys
 
  const marc = data.map(item => `<li><img src= ${item.flags.svg}> ${item.name.official}</li>`).join("");
  refs.countryList.innerHTML = marc;
  
}

function countryCard(data) {   //showCauntryCard

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
    `
    
}
  //------------------------------------------------------

   


