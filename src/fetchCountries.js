
export default function fetchCountries(name) {
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