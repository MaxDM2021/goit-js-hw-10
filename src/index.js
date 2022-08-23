import './css/styles.css';
import handelbars from 'express-handlebars';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import debounce from 'lodash.debounce';
import countryCardTpl from '../templates/country-card.hbs';
import getRefs from './get-refs';

import API from './fetchContries'

const refs = getRefs();

const DEBOUNCE_DELAY = 300;


  refs.searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

  function onSearch (e) {
    e.preventDefault();
  
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;
  
  
  API.fetchContries(searchQuery)
  .then(renderCountryCard)
  .catch(onFetchError)
  .finally(() => form.reset());
  }


  function renderCountryCard(country) {
    const markup = countryCardTpl(country);
    refs.countryInfoContainer.innerHTML = markup;
  }
  
  function onFetchError (error) {
    Notiflix.Notify.failure('❌ Oops, there is no country with that name', {
      timeout: 2000,
    });
  }