import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
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

// Fisher-Yates shuffle (guaranteed not already sorted, safe for empty/single)
function shuffle(arr) {
  if (arr.length <= 1) return [...arr];
  let a = [...arr];
  do {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  } while (a.every((item, i) => item.id === arr[i].id));
  return a;
}

const MARILYN_NAME = '\u2039\uD835\uDE39\uD835\uDE2E \uD835\uDE33\uD835\uDE26\uD835\uDE22\uD835\uDE33 \uD835\uDE39\uD835\uDE22\uD835\uDE33\uD835\uDE2D\uD835\uDE3A\uD835\uDE3B\u203A';
const ADIKA_NAME   = '\u20B3\u030A\u00D0\u0457\u0308\u0308\u04E5\u04E3\u030A\u10C1\u00E5 \u0493\u1D1C\u20DD\u300E\uD835\uDC0A\uD835\uDC11\uD835\uDC16\u300F';

// ── Drag card (left panel) ────────────────────
const SortableCard = ({ item, solved, activeId }) => {
  const {
    attributes, listeners, setNodeRef,
    transform, transition, isDragging,
  } = useSortable({ id: item.id });

  const isMarilyn = item.sender === 'marilyn';

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      <div style={{
        padding: '7px 10px',
        marginBottom: '5px',
        background: isDragging
          ? 'rgba(255,255,255,0.03)'
          : solved
          ? isMarilyn ? 'rgba(220,60,60,0.10)' : 'rgba(60,100,220,0.10)'
          : 'rgba(255,255,255,0.04)',
        border: isDragging
          ? isMarilyn ? '1px solid rgba(220,60,60,0.7)' : '1px solid rgba(80,130,255,0.7)'
          : solved
          ? isMarilyn ? '1px solid rgba(220,60,60,0.30)' : '1px solid rgba(80,130,255,0.30)'
          : '1px solid rgba(255,255,255,0.09)',
        borderLeft: isMarilyn
          ? `3px solid ${solved || isDragging ? '#dc3c3c' : 'rgba(220,60,60,0.4)'}`
          : `3px solid ${solved || isDragging ? '#3c6ee0' : 'rgba(60,110,224,0.4)'}`,
        borderRadius: '6px',
        cursor: isDragging ? 'grabbing' : 'grab',
        display: 'flex',
        alignItems: 'center',
        gap: '7px',
        userSelect: 'none',
        opacity: isDragging ? 0.45 : 1,
        transition: 'all 0.15s ease',
        boxShadow: isDragging ? '0 8px 24px rgba(0,0,0,0.5)' : 'none',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '11px', flexShrink: 0 }}>⠿</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontSize: '8px',
            color: isMarilyn ? '#ef6c6c' : '#6c9aef',
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: '1px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {isMarilyn ? MARILYN_NAME : ADIKA_NAME}
          </p>
          <p style={{
            fontSize: '11px',
            color: solved
              ? isMarilyn ? '#ef6c6c' : '#6c9aef'
              : 'rgba(255,255,255,0.82)',
            lineHeight: 1.35,
            wordBreak: 'break-word',
            margin: 0,
          }}>
            {item.text}
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Single WhatsApp bubble ─────────────────────
const ChatBubble = ({ item, highlight }) => {
  const isMarilyn = item.sender === 'marilyn';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: isMarilyn ? 'flex-end' : 'flex-start',
      marginBottom: '3px',
    }}>
      <div style={{
        maxWidth: '82%',
        padding: '5px 9px 7px',
        borderRadius: isMarilyn ? '10px 2px 10px 10px' : '2px 10px 10px 10px',
        background: isMarilyn
          ? highlight ? 'rgba(160,25,25,0.80)' : 'rgba(120,15,15,0.65)'
          : highlight ? 'rgba(25,45,170,0.80)' : 'rgba(15,25,130,0.60)',
        border: isMarilyn
          ? `1px solid ${highlight ? 'rgba(255,80,80,0.45)' : 'rgba(200,60,60,0.20)'}`
          : `1px solid ${highlight ? 'rgba(80,120,255,0.45)' : 'rgba(60,100,220,0.20)'}`,
        boxShadow: highlight
          ? isMarilyn ? '0 0 10px rgba(220,60,60,0.30)' : '0 0 10px rgba(60,110,220,0.30)'
          : 'none',
        transition: 'all 0.25s ease',
        position: 'relative',
      }}>
        <p style={{
          fontSize: '11px',
          color: 'rgba(233,237,239,0.90)',
          lineHeight: 1.45,
          wordBreak: 'break-word',
          margin: 0,
          paddingRight: isMarilyn ? '24px' : '0',
        }}>
          {item.text}
        </p>
        {isMarilyn && (
          <span style={{
            position: 'absolute',
            bottom: '4px',
            right: '7px',
            fontSize: '8px',
            color: 'rgba(83,189,235,0.6)',
          }}>
            ✓✓
          </span>
        )}
      </div>
    </div>
  );
};

// ── Main component ─────────────────────────────
export default function MemoryChatDrag({ onUnlock }) {
  const correct = GAME_DATA.separationChats;
  const [items, setItems]       = useState(() => shuffle(correct));
  const [solved, setSolved]     = useState(false);
  const [activeId, setActiveId] = useState(null);
  const chatBodyRef             = React.useRef(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Check correctness — only when there are chats to sort
  useEffect(() => {
    if (correct.length === 0) return;
    if (items.every((item, i) => item.id === correct[i].id)) {
      setSolved(true);
      setTimeout(() => onUnlock(), 1200);
    }
  }, [items, correct, onUnlock]);

  // Auto-scroll chat preview
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [items]);

  const handleDragStart = ({ active }) => setActiveId(active.id);
  const handleDragEnd   = ({ active, over }) => {
    setActiveId(null);
    if (over && active.id !== over.id) {
      setItems(prev => {
        const oldIdx = prev.findIndex(i => i.id === active.id);
        const newIdx = prev.findIndex(i => i.id === over.id);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  };

  const activeItem = activeId ? items.find(i => i.id === activeId) : null;

  return (
    <div style={{
      width: '100%',
      maxWidth: '820px',
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
      padding: '0 4px',
    }}>

      {/* ── LEFT: Drag list ─────────────────── */}
      <div style={{ flex: '0 0 248px', display: 'flex', flexDirection: 'column' }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '8px',
          letterSpacing: '0.20em',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
          // drag to reorder
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
            {items.map(item => (
              <SortableCard key={item.id} item={item} solved={solved} activeId={activeId} />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeItem && (
              <div style={{
                padding: '7px 10px',
                background: activeItem.sender === 'marilyn'
                  ? 'rgba(220,60,60,0.18)' : 'rgba(60,110,220,0.18)',
                border: activeItem.sender === 'marilyn'
                  ? '1px solid rgba(220,60,60,0.65)' : '1px solid rgba(60,110,220,0.65)',
                borderLeft: activeItem.sender === 'marilyn'
                  ? '3px solid #dc3c3c' : '3px solid #3c6ee0',
                borderRadius: '6px',
                boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
                opacity: 0.96,
              }}>
                <p style={{
                  fontSize: '8px',
                  color: activeItem.sender === 'marilyn' ? '#ef6c6c' : '#6c9aef',
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: '2px',
                }}>
                  {activeItem.sender === 'marilyn' ? MARILYN_NAME : ADIKA_NAME}
                </p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.88)', margin: 0 }}>
                  {activeItem.text}
                </p>
              </div>
            )}
          </DragOverlay>
        </DndContext>

        <p style={{
          marginTop: '12px',
          fontSize: '9px',
          fontFamily: "'JetBrains Mono', monospace",
          color: solved ? 'var(--cyan)' : 'var(--text-muted)',
          fontStyle: 'italic',
          textAlign: 'center',
          transition: 'color 0.3s',
        }}>
          {solved ? '// memory restored ✓' : '// arrange chronologically'}
        </p>
      </div>

      {/* ── RIGHT: WhatsApp preview ──────────── */}
      <div style={{
        flex: 1,
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '520px',
        background: '#0b141a',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 32px rgba(0,0,0,0.45)',
      }}>
        {/* Header */}
        <div style={{
          background: '#182229',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '9px 13px',
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          flexShrink: 0,
        }}>
          <div style={{
            width: '32px', height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3c6ee0 0%, #ef6c6c 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: 700, color: '#fff',
            flexShrink: 0,
          }}>M</div>
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: '#e9edef', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '170px' }}>
              {MARILYN_NAME}
            </p>
            <p style={{ fontSize: '9px', color: '#8696a0', fontFamily: "'JetBrains Mono', monospace" }}>
              last seen long ago
            </p>
          </div>
        </div>

        {/* Chat body */}
        <div
          ref={chatBodyRef}
          style={{
            flex: 1,
            padding: '10px 8px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Date chip */}
          <div style={{
            alignSelf: 'center',
            background: '#182229',
            color: '#8496a0',
            fontSize: '10px',
            padding: '3px 10px',
            borderRadius: '8px',
            marginBottom: '10px',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            2025
          </div>

          {/* Sender legend */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            padding: '0 2px',
          }}>
            <span style={{
              fontSize: '7.5px', color: '#3c6ee0',
              fontFamily: "'JetBrains Mono', monospace",
              maxWidth: '46%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              ← {ADIKA_NAME}
            </span>
            <span style={{
              fontSize: '7.5px', color: '#dc3c3c',
              fontFamily: "'JetBrains Mono', monospace",
              maxWidth: '46%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              textAlign: 'right',
            }}>
              {MARILYN_NAME} →
            </span>
          </div>

          {/* Bubbles */}
          {items.map((item, i) => {
            const isCorrectPos = item.id === correct[i].id;
            return (
              <ChatBubble key={item.id} item={item} highlight={solved || isCorrectPos} />
            );
          })}
        </div>

        {/* Decorative input bar */}
        <div style={{
          background: '#182229',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '9px 11px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexShrink: 0,
        }}>
          <div style={{
            flex: 1,
            background: '#2a3942',
            borderRadius: '20px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 13px',
          }}>
            <span style={{ fontSize: '10px', color: '#8696a0', fontFamily: "'JetBrains Mono', monospace" }}>
              {solved ? '// conversation restored ✓' : '// sort messages on the left…'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
