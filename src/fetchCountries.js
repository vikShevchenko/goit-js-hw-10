export default function fetchCountries(name) {
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
  