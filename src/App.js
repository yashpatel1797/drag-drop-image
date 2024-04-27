import { useEffect, useRef, useState } from 'react';
import './App.css';
import { ImageCard } from './components/ImageCard';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());

  useEffect(() => {
    fetch('http://localhost:3000/api/data')
    .then((res) => res.json())
    .then((data) => {
      setItems(data);
    })
  }, [])

  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (isLoading) return; 
      saveData();
    }, 5000);

    return () => clearInterval(saveInterval);
  }, [items, isLoading]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  
  function saveData() {
    if (isLoading) return; 

    setIsLoading(true);
    fetch('http://localhost:3000/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items }),
    })
    .then(response => response.json())
      .then((data) => {
        const {Updated} = data;
        if(Updated === true) {
          setLastSaveTime(Date.now());
        }
        setTimeout(() => {
          setIsLoading(false);
        }, 150);
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        setIsLoading(false);
      });
  }

  const timeSinceLastSave = Math.floor((Date.now() - lastSaveTime) / 1000);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="container p-8">
          <div className="grid grid-cols-3 gap-4">
            {items?.map((item) => (
              <ImageCard 
                key={item.id} 
                id={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      </SortableContext>
      {isLoading && <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-500"></div>}
      {!isLoading && <div className="text-center text-2xl font-bold">Last saved {timeSinceLastSave} seconds ago</div>}
    </DndContext> 
    );
}

export default App;
