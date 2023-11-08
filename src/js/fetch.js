import axios from 'axios';
import { funcSorryError, funcError } from './notifix';
import { page } from '..';

const KEY = '40433547-a16bb9ed48620ac03347923c1';
const URL = 'https://pixabay.com/api/';

export let perPage = 40;

export async function getCard(searchCard, page) {
  const params = new URLSearchParams({
    q: `${searchCard}`,
    lang: 'en',
    key: `${KEY}`,
    orientation: 'horizontal',
    page: `${page}`,
    per_page: `${perPage}`,
    image_type: 'photo',
    safesearch: true,
    // order: 'latest',
  });

  try {
    const response = await axios.get(`${URL}?${params}`);

    if (response.data.total === 0) {
      funcSorryError();
    }
    console.log(response.data);

    return response.data;
  } catch (error) {
    funcError();
    console.error(error);
  }
}
