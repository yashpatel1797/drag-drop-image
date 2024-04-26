import { useState } from 'react';
import './App.css';
import { ImageCard } from './components/ImageCard';
import data from './data/documents.json';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';

function App() {
  const [items, setItems] = useState(data);

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

  return (
    <DndContext
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div className="container p-8">
          <div className="grid grid-cols-3 gap-4">
            {items.map((item) => (
              <ImageCard 
                key={item.id} 
                id={item.id}
                item={item}
              />
            ))}
          </div>
        </div>
      </SortableContext>
    </DndContext> 
    );
}

export default App;
