/* Створи фронтенд частину застосунку пошуку і перегляду зображень за ключовим словом*/

import './index.css';
import Notiflix from 'notiflix';

import { getCard, perPage } from './js/fetch';
import { createMarkup } from './js/createmarkup';
import { funcSimpleLightbox } from './js/simplelightbox';

import { funcError } from './js/notifix';

const search = document.querySelector('.js-search-form');
const gallery = document.querySelector('.gallery');
export const btnMore = document.querySelector('.load-more');
search.addEventListener('submit', onSearch);
btnMore.classList.add('is-hidden');

let searchCard = '';
export let page = 1;

async function onSearch(evt) {
  evt.preventDefault();

  gallery.innerHTML = '';
  page = 1;
  searchCard = evt.currentTarget[0].value;
  btnMore.classList.remove('is-hidden');
  const data = await getCard(searchCard, page);
  gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));

  console.log(page, searchCard);
  
  let totalHitsFound = data.totalHits;
  if (totalHitsFound === 0 && totalHitsFound === data.total) {
    btnMore.classList.add('is-hidden');
    search.reset();
  }

  if (totalHitsFound !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHitsFound} images.`);
    btnMore.classList.remove('is-hidden');
    search.reset();
  }

  funcSimpleLightbox();

  if (totalHitsFound < data.total) {
    btnMore.classList.remove('is-hidden');
  }
 
}

btnMore.addEventListener('click', onBtnMore);

async function onBtnMore(evn) {
  page += 1;
  const data = await getCard(searchCard, page);
  gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
  let totalHitsFound = data.totalHits;

  funScrollBy();
  funcSimpleLightbox();

  console.log(page, searchCard);

  if (page * perPage >= totalHitsFound) {
    btnMore.classList.add('is-hidden');

    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function funScrollBy() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();
  
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
