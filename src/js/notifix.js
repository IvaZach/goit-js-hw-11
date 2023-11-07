import Notiflix from 'notiflix';
import { btnMore } from '..';

const upsContent = 'Oops! Something went wrong! Try reloading the page!';
const sorryContent =
  'Sorry, there are no images matching your search query. Please try again.';

export function funcError() {
  btnMore.classList.add('is-hidden');
  Notiflix.Notify.failure(upsContent);
}

export function funcSorryError() {
  btnMore.classList.add('is-hidden');
  Notiflix.Notify.failure(sorryContent);
}
