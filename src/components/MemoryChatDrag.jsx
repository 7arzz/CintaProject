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

const SortableItem = ({ id, text, index, solved }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div style={{
        padding: '12px 16px',
        marginBottom: '6px',
        background: solved ? 'rgba(0,212,255,0.07)' : 'var(--surface)',
        border: solved
          ? '1px solid rgba(0,212,255,0.25)'
          : isDragging
          ? '1px solid var(--accent)'
          : '1px solid var(--border-2)',
        borderRadius: '6px',
        cursor: isDragging ? 'grabbing' : 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        userSelect: 'none',
        boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,0.4)' : 'none',
        opacity: isDragging ? 0.85 : 1,
        transition: 'background 0.2s, border-color 0.2s',
      }}>
        {/* Index badge */}
        <span style={{
          width: '22px', height: '22px',
          borderRadius: '50%',
          background: solved ? 'rgba(0,212,255,0.15)' : 'var(--bg)',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '10px',
          fontFamily: "'JetBrains Mono',monospace",
          color: solved ? 'var(--cyan)' : 'var(--text-muted)',
          flexShrink: 0
        }}>
          {index + 1}
        </span>
        <span style={{
          fontSize: '13px',
          color: solved ? 'var(--cyan)' : 'var(--text)',
          flex: 1
        }}>
          {text}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: '14px', opacity: 0.5 }}>⠿</span>
      </div>
    </div>
  );
};

export default function MemoryChatDrag({ onUnlock }) {
  const [items, setItems] = useState([...GAME_DATA.separationChats]);
  const [solved, setSolved] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  useEffect(() => {
    if (items[0].id === '1' && items[1].id === '2' && items[2].id === '3') {
      setSolved(true);
      setTimeout(() => onUnlock(), 1000);
    }
  }, [items, onUnlock]);

  return (
    <div style={{ maxWidth: '400px', width: '100%', padding: '2rem', textAlign: 'center' }}>

      <p style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        letterSpacing: '0.25em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginBottom: '12px'
      }}>
        // memory_reconstruct
      </p>

      <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '6px' }}>
        Reconstruct the Final Messages
      </h2>

      <p style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        fontFamily: "'JetBrains Mono',monospace",
        marginBottom: '28px'
      }}>
        Drag to sort into chronological order
      </p>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              text={item.text}
              index={index}
              solved={solved}
            />
          ))}
        </SortableContext>
      </DndContext>

      <p style={{
        marginTop: '20px',
        fontSize: '11px',
        fontFamily: "'JetBrains Mono',monospace",
        color: solved ? 'var(--cyan)' : 'var(--text-muted)',
        fontStyle: 'italic',
        transition: 'color 0.3s'
      }}>
        {solved ? '// memory restored ✓' : '// drag items to reorder'}
      </p>
    </div>
  );
}
