import axios from "axios";

const searchResult = document.getElementById('search-result');
const searchForm = document.getElementById('search-form')
searchForm.addEventListener('submit', searchCountry);
const eMessage = document.getElementById('error-message');

function searchCountry(e){
e.preventDefault();
    const searchValue = document.getElementById('search-value');
    fetchData(searchValue.value);
    searchValue.value = '';
}
async function fetchData(name){
searchResult.innerHTML = ``;
    try{
const result = await axios.get(`https://restcountries.com/v2/name/${name}`)
        const country = result.data[0];
        console.log(result.data[0]);
        searchResult.innerHTML = `<article>
        <span class="flag-container"><img src="${country.flag}" alt="flag" width="100px"/>
        <h2 class = ${getContinentColor(country.region)}>${country.name}</h2></span>
        <h4>${country.name} is situated in ${country.subregion}. It has a population of ${country.population} people.</h4>
        <p>${country.region}</p>
        <p>The capital city is ${country.capital}${currencyInfo(country.currencies)}</p>
        <p>${languageInfo(country.languages)}</p>
        </article>`;
    }
    catch(e){
console.error(e);
    eMessage.innerHTML = `<p class="error">Oooops! This country ${name} does not exist. Try again</p>`;
    }
}

function currencyInfo(currencies) {
    let output = ' and you can pay with ';
    if (currencies.length === 2) {
        return output + `${currencies[0].name} and ${currencies[1].name}`;
    }
    return output + `${currencies[0].name}`;
}

function languageInfo(languages) {
    let output = 'They speak ';
    if (languages.length === 3) {
        return output + `${languages[0].name} and ${languages[1].name} and ${languages[2].name}`;
    }
    if(languages.length === 2){
        return output + `${languages[0].name} and ${languages[1].name}`;
    }
    return output + `${languages[0].name}`;
}

function getContinentColor(region) {
    switch (region) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        default:
            return 'gray';
    }
}