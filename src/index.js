/*Під час завантаження сторінки має виконуватися HTTP-запит за колекцією порід */

// import SlimSelect from 'slim-select';
// import Notiflix from 'notiflix';
// import { fetchBreeds, fetchCatByBreed } from './cat-api';

// const refs = {
//   choiceOfCollection: document.querySelector('.breed-select'),
//   loaderCollection: document.querySelector('.loader'),
//   loadingError: document.querySelector('.error'),
//   catInfo: document.querySelector('.cat-info'),
// };

// const { choiceOfCollection, loaderCollection, loadingError, catInfo } = refs;

// funcLoadingAdd();

// let breedsCollection = [];

// fetchBreeds()
//   .then(data => {
//     funcLoadingRemove();
//     choiceOfCollection.classList.remove('is-hidden');
//     data.forEach(elem => {
//       breedsCollection.push({
//         text: elem.name,
//         value: elem.id,
//       });
//     });

//     markupSection(breedsCollection);
//   })
//   .catch(error => {
//     funcError();
//     console.log(error);
//   });

// function markupSection(breedsCollection) {
//   const markupSect = breedsCollection
//     .map(({ text, value }) => {
//       return `<option value="${value}">${text}</option>`;
//     })
//     .join('');
//   choiceOfCollection.innerHTML = markupSect;
//   new SlimSelect({
//     select: choiceOfCollection,
//   });
// }
// choiceOfCollection.addEventListener('change', onChoice);

// function onChoice(evn) {
//   const breedId = evn.currentTarget.value;

//   funcLoadingAdd();
//   catInfo.classList.add('is-hidden');

//   fetchCatByBreed(breedId)
//     .then(data => renderCardCat(data))
//     .catch(error => {
//       funcError();
//       catInfo.classList.add('is-hidden');
//       console.log(error);
//     });
// }

// function renderCardCat(data) {
//   catInfo.classList.remove('is-hidden');
//   const { url, breeds } = data[0];

//   const cardCat = `<div class='cardcat'><img src="${url}" alt="${breeds[0].name}" width="400">
//     <h1>${breeds[0].name}</h1><p>TEMPERAMENT: ${breeds[0].temperament}</p><p>DESCRIPTION: ${breeds[0].description}</p></div>`;
//   catInfo.innerHTML = cardCat;
//   funcLoadingRemove();
// }

// function funcError() {
//   Notiflix.Notify.failure(loadingError.textContent);
//   funcLoadingRemove();
// }

// function funcLoadingAdd() {
//   loaderCollection.classList.add('loader');
//   loaderCollection.hidden = false;
// }

// function funcLoadingRemove() {
//   loaderCollection.classList.remove('loader');
//   loaderCollection.hidden = true;
// }

/* Створи фронтенд частину застосунку пошуку і перегляду зображень за ключовим словом*/

import './index.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const KEY = '40433547-a16bb9ed48620ac03347923c1';
const URL = 'https://pixabay.com/api/';

const search = document.querySelector('.js-search-form');
const gallery = document.querySelector('.gallery');
search.addEventListener('submit', onSearch);

function onSearch(evt) {
  evt.preventDefault();

  const searchCard = evt.currentTarget[0].value;
  console.log(searchCard);

  getCard(searchCard)
    .then(data => {
      gallery.innerHTML = createMarkup(data.hits);
      
      const lightbox = new SimpleLightbox('.link', {
        captionsData: 'alt',
        captionDelay: 200,
        captionPosition: 'bottom',
      });

      console.log(lightbox);
      lightbox.on('show.simplelightbox');
      lightbox.on('error.simplelightbox', function (e) {
        console.log(e);
      });
    })
    .catch(err => console.log(err));
}

async function getCard(searchCard) {
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

  let requestOptions = {
    method: 'GET',
  };

  return await fetch(`${URL}?${params}`, requestOptions).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<div class="photo-card">
        <a class="link" href="${largeImageURL}">          
        <div class="thumb"> 
    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        <b>${likes}</b>
      </p>
      <p class="info-item">
        <b>Views</b>
        <b>${views}</b>
      </p>
      <p class="info-item">
        <b>Comments</b>
        <b>${comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads</b>
        <b>${downloads}</b>
      </p>
    </div>
    </a>
  </div>`
    )
    .join('');
}

// const lightbox = new SimpleLightbox('.link', {
//   captionsData: 'alt',
//   captionDelay: 250,
//   captionPosition: 'bottom',
// });

// console.log(lightbox);
// lightbox.on('show.simplelightbox');
// lightbox.on('error.simplelightbox', function (e) {
// 	console.log(e); // some usefull information
// });

// const searchForm = document.querySelector('.js-search');
// const addCountry = document.querySelector('.js-add');
// const list = document.querySelector('.js-list');
// const formContainer = document.querySelector('.js-form-container')
// const markup = '<input type="text" name="country">'
// addCountry.addEventListener('click', handlerAddInput);

// function handlerAddInput() {
//     formContainer.insertAdjacentHTML('beforeend', markup)
// }

// searchForm.addEventListener('submit', handlerForm);

// function handlerForm(evt) {
//     evt.preventDefault()
//     const data = new FormData(evt.currentTarget);
//     const arr = data.getAll('country').filter(item => item).map(item => item.trim())
//     getCountries(arr)
//         .then(async resp => {
//             const capitals = resp.map(({ capital }) => capital[0]);
//             const weatherService = await getWeather(capitals);
//             list.innerHTML = createMarkup(weatherService)
//         })
//         .catch(e => console.log(e))
//         .finally(() => {
//             formContainer.innerHTML = markup
//             searchForm.reset()
//         })
// }

// async function getCountries(arr) {
//     const resps = arr.map(async item => {
//         const resp = await fetch(`https://restcountries.com/v3.1/name/${item}`)
//         if (!resp.ok) {
//             throw new Error()
//         }

//         return resp.json()
//     })

//     const data = await Promise.allSettled(resps)
//     const countryObj = data.filter(({ status }) => status === "fulfilled").map(({ value }) => value[0]);

//     return countryObj;
// }

// async function getWeather(arr) {
//     const BASE_URL = "http://api.weatherapi.com/v1";
//     const API_KEY = "ce2cb9b2a3da414bb5b172546231704";

//     const resps = arr.map(async city => {
//         const params = new URLSearchParams({
//             key: API_KEY,
//             q: city,
//             lang: 'uk'
//         });

//         const resp = await fetch(`${BASE_URL}/current.json?${params}`);

//         if (!resp.ok) {
//             throw new Error(resp.statusText);
//         }

//         return resp.json()
//     })

//     const data = await Promise.allSettled(resps)
//     const objs = data.filter(({ status }) => status === "fulfilled").map(({ value }) => value);

//     return objs
// }

// function createMarkup(arr) {
//     return arr.map(({ current: { temp_c, condition: { text, icon } }, location: { country, name } }) =>
//         `<li>
//     <div>
//         <h2>${country}</h2>
//         <h3>${name}</h3>
//     </div>
//     <img src="${icon}" alt="${text}">
//     <p>${text}</p>
//     <p>${temp_c}</p>
// </li>`).join('')
// }
