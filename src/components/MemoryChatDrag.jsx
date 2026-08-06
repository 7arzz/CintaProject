import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GAME_DATA } from '../data';

const SortableItem = ({ id, text }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '15px',
    margin: '10px 0',
    backgroundColor: '#fff',
    color: '#000', // Ensure text is visible
    border: '1px solid #ddd',
    borderRadius: '8px',
    cursor: 'grab',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    touchAction: 'none' // Prevent scrolling while dragging on mobile
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {text}
    </div>
  );
};

export default function MemoryChatDrag({ onUnlock }) {
  // We use the array from GAME_DATA
  const [items, setItems] = useState([...GAME_DATA.separationChats]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    // Check if sorted correctly
    if (items[0].id === '1' && items[1].id === '2' && items[2].id === '3') {
      setTimeout(() => {
        onUnlock();
      }, 1000);
    }
  }, [items, onUnlock]);

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem', textAlign: 'center' }}>
      <h2>Reconstruct the Final Messages</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>Drag and drop to sort them into the correct chronological order.</p>
      
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items.map(i => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map(item => (
            <SortableItem key={item.id} id={item.id} text={item.text} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
