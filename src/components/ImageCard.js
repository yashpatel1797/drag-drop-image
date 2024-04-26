import React, { useCallback, useEffect, useState } from 'react';
import {CSS} from '@dnd-kit/utilities';
import {useSortable} from '@dnd-kit/sortable';

const ImageCard = ({item}) => {
  const { title, url } = item;
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleCardClick = (e) => {
    setShowOverlay((prevState) => !prevState);
  };

  const handleCloseOverlay = useCallback(() => {
    setShowOverlay(false);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.keyCode === 27) {
      setShowOverlay(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id:item.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef} style={style} {...attributes} {...listeners}
      className="w p-2" 
      onClick={handleCardClick}
    >
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="p-2">
          <h3 className="text-lg text-center font-semibold">{title}</h3>
        </div>
        {loading && (
            <div className="w-full h-40 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
            </div>
        )}
        <img 
          src={url}
          alt={title}
          className={`w-full h-40 object-contain ${loading ? 'hidden' : ''}`}
          onLoad={handleImageLoad}
        />
      </div>
      {showOverlay && (
         <div onClick={handleCloseOverlay} className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 z-50">
         <div className="relative max-w-3xl max-h-full overflow-auto">
          <img src={url} alt={title} className="mx-auto h-96"/>
        </div>
        </div>
      )}
    </div>
 
  );
};

export { ImageCard };