import { http, HttpResponse } from "msw";
import data from '../data/documents.json';

localStorage.setItem('data', JSON.stringify(data));

const fetchData = () => {
  const storedData = localStorage.getItem('data');
  if (storedData) {
    return JSON.parse(storedData);
  } else {
    return require('../data/documents.json');
  }
};
export const handlers = [
  http.get('/api/data', (resolver) => {
    return HttpResponse.json(fetchData());
  })
]
