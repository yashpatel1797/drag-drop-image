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
  }),

  http.post('/api/save', async ({ request }) => {
    const newData = await request.json();

    if (JSON.stringify(newData) === JSON.stringify(fetchData())) {
      return  HttpResponse.json({Updated: false, message: "No changes has been done."});
    }

    localStorage.setItem('data', JSON.stringify(newData));

    return HttpResponse.json({newData, Updated: true});
  }),

   // DELETE endpoint to remove an item
   http.delete('/api/data/:id', ({ params }) => {
    const itemId = parseInt(params.id);
    const existingData = fetchData();

    // Filter out the item to delete
    const updatedData = existingData.filter(item => item.id !== itemId);
    localStorage.setItem('data', JSON.stringify(updatedData));

    return HttpResponse.json({ updatedData, message: "Item deleted successfully" });
  }),

   // POST endpoint to add a new item
   http.post('/api/data', async ({ request }) => {
    const newData = await request.json();
    const existingData = fetchData();

    const updatedData = [...existingData, newData];
    localStorage.setItem('data', JSON.stringify(updatedData));

    return HttpResponse.json({ newItem: newData, message: "Item added successfully" });
  }),

  // PUT endpoint to update an existing item
  http.put('/api/data/:id', async ({ params, request }) => {
    const itemId = parseInt(params.id);
    const updatedItemData = await request.json();
    const existingData = fetchData();

    const itemIndex = existingData.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      existingData[itemIndex] = { ...existingData[itemIndex], ...updatedItemData };
      localStorage.setItem('data', JSON.stringify(existingData));

      return HttpResponse.json({ updatedItem: existingData[itemIndex], message: "Item updated successfully" });
    } else {
      return HttpResponse.json({ message: "Item not found", error: true });
    }
  }),
]
