import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import {
  renderMarkupCountryInfo,
  renderMarkupCountryList,
} from './renderMarkup';
import getRefs from './get-refs';
import API from './fetchCountries'


const DEBOUNCE_DELAY = 300;
let LIMIT_COUNTRY = 10;

const refs = getRefs();


  refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

  function onSearch (e) {
    e.preventDefault();
  
    const searchQuery = refs.searchForm.value.toLowerCase().trim();

    if (searchQuery === '') {
      clearMarkup()
      return;
    }
    
    API.fetchCountries(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError)
    .finally(() => form.reset());
    }


function onFetchError () {
  clearMarkup();
  Notiflix.Notify.failure('❌ Oops, there is no country with that name', {
    timeout: 2000,
  });
}

function clearMarkup() {
  refs.countryInfoContainer.innerHTML = '';
  refs.countryListContainer.innerHTML = '';
}


  function renderCountryCard(countries) {
    clearMarkup();
if (countries.length > LIMIT_COUNTRY) {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', {
    timeout: 2000,
  });
  return

} else if (countries.length === 1) {
  refs.countryInfoContainer.innerHTML = renderMarkupCountryInfo(countries[0]);

}else {
  let countryListContainer = "";
 countries.map(country => {
  countryListContainer += renderMarkupCountryList(country);
 })
  refs.countryListContainer.insertAdjacentHTML('beforeend',  countryListContainer)
}
}
  






