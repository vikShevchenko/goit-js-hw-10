
export default function fetchCountries(name){

  return fetch(`https://restcountries.com/v3.1/name/${name}`).then(response => {
      if (!response.ok) {

        throw new Error(response.statusText);

      }
      console.log(response)
      return response.json()
    })
  }
 
