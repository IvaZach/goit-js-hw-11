import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_ifmh6oPbVq3C79oeoUHjfiFPaEEaDAvg4T4IdcvT4xmyUaaw8BwCY0GvD4TvWQbK';

const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT_BREADS = 'breeds';
const END_POINT_SEARCH = 'images/search';
const API_KEY =
  'live_ifmh6oPbVq3C79oeoUHjfiFPaEEaDAvg4T4IdcvT4xmyUaaw8BwCY0GvD4TvWQbK';

const option = {
  method: 'GET',
  redirect: 'follow',
  headers: {
    'x-api-key': `${API_KEY}`,
  },
};

export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT_BREADS}`, option).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  const param = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios.get(`${BASE_URL}${END_POINT_SEARCH}?${param}`).then(response => {
    return response.data;
  });
}
