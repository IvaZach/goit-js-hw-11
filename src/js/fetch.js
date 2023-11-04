import axios from 'axios';
import { funcError, funcSorryError } from './notifix';

const KEY = '40433547-a16bb9ed48620ac03347923c1';
const URL = 'https://pixabay.com/api/';

import { btnMore } from '..';

export let page = 1;
export let perPage = 40;

export async function getCard(searchCard) {
  const params = new URLSearchParams({
    q: `${searchCard}`,
    lang: 'en',
    key: `${KEY}`,
    orientation: 'horizontal',
    page: `${page}`,
    per_page: `${perPage}`,
    image_type: 'photo',
    safesearch: true,
  });

  try {
    const response = await axios.get(`${URL}?${params}`);

    if (response.data.total === 0) {
      btnMore.classList.add('is-hidden');
      funcSorryError();
      
    }
    console.log('4', response.data);
    page +=1;
    return response.data;
  } catch (error) {
    console.error('3', error);
  }
}
