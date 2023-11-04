import Notiflix from 'notiflix';


const upsContent = 'Oops! Something went wrong! Try reloading the page!';
const sorryContent =
  'Sorry, there are no images matching your search query. Please try again.';

export function funcError() {
  
  Notiflix.Notify.failure(upsContent);
}

export function funcSorryError() {
  Notiflix.Notify.failure(sorryContent);
}

