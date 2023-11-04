/* Створи фронтенд частину застосунку пошуку і перегляду зображень за ключовим словом*/

import './index.css';
import Notiflix from 'notiflix';
import { getCard, page, perPage } from './js/fetch';
import { createMarkup } from './js/createmarkup';
import { funcLightbox } from './js/simplelightbox';

import { funcError, funcSorryError } from './js/notifix';

const search = document.querySelector('.js-search-form');
const gallery = document.querySelector('.gallery');
export const btnMore = document.querySelector('.load-more');
search.addEventListener('submit', onSearch);
btnMore.classList.add('is-hidden');

function onSearch(evt) {
  evt.preventDefault();

  let searchCard = evt.currentTarget[0].value;

  getCard(searchCard)
    .then(data => {
      gallery.innerHTML = createMarkup(data.hits);
      console.log('1 markup');
      let totalHitsFound = data.totalHits;
      if (totalHitsFound !== 0) {
        Notiflix.Notify.info(`Hooray! We found ${totalHitsFound} images.`);
      }
      funcLightbox();

      btnMore.classList.remove('is-hidden');
      btnMore.addEventListener('click', onBtnMore);
      function onBtnMore(evt) {
        console.log('2 more', evt);
        getCard(searchCard).then(data => {
          gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
          if ((page - 1) * perPage >= totalHitsFound) {
            btnMore.classList.add('is-hidden');
            console.log('6', page);
            Notiflix.Notify.warning(
              "We're sorry, but you've reached the end of search results."
            );
          }
        });
      }

      search.reset();
    })
    .catch(err => {
      btnMore.classList.add('is-hidden');
      funcError();
      console.log(err);
    });
}

