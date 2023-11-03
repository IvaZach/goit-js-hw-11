import axios from 'axios';
import { funcError, funcSorryError } from './notifix';

const KEY = '40433547-a16bb9ed48620ac03347923c1';
const URL = 'https://pixabay.com/api/';

export async function getCard(searchCard) {
  const params = new URLSearchParams({
    q: `${searchCard}`,
    lang: 'en',
    key: `${KEY}`,
    orientation: 'horizontal',
    page: 1,
    per_page: 40,
    image_type: 'photo',
    safesearch: true,
  });

 try {
  const response = await axios.get(`${URL}?${params}`)

if (response.data.total === 0){
    
    funcSorryError();
}
 console.log(response.data);
return response.data}
 catch (error) {
    funcError();
    console.error('6', error);
 }}
