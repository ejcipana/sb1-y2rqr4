import React from 'react';

interface AnimatedCursorProps {
  position: { x: number; y: number };
  isVisible: boolean;
}

export function AnimatedCursor({ position, isVisible }: AnimatedCursorProps) {
  if (!isVisible) return null;

  return (
    <div
      className="absolute w-8 h-8 pointer-events-none transition-all duration-300 ease-out z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        src="/cursor.png"
        alt="Cursor"
        className="w-full h-full"
      />
    </div>
  );
}