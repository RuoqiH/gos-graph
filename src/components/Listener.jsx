import React, { useRef, useEffect } from 'react';

export const ScrollListener = ({ style, children, onScroll }) => {
  const isCursorInside = useRef(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleMouseEnter = () => {
      isCursorInside.current = true;
    };

    const handleMouseLeave = () => {
      isCursorInside.current = false;
    };

    const div = ref.current;
    if (div) {
      div.addEventListener('mouseenter', handleMouseEnter);
      div.addEventListener('mouseleave', handleMouseLeave);

      // Clean up the event listeners on component unmount
      return () => {
        div.removeEventListener('mouseenter', handleMouseEnter);
        div.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [ref.current]);

  useEffect(() => {
    const handleScroll = (event) => {
      if (isCursorInside.current) {
        onScroll(event);
      }
    }
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);
  return (
    <div style={style} ref={ref}>{children}</div>
  );
};

export const DragListener = ({ style, children, onDrag }) => {
  const divRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startPosition, setStartPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const deltaX = event.clientX - startPosition.x;
      const deltaY = event.clientY - startPosition.y;
      onDrag({ deltaX, deltaY });
      setStartPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    const div = divRef.current;

    if (div) {
      div.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (div) {
        div.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startPosition]);

  return (
    <div ref={divRef} style={{ style }}>
      {children}
    </div>
  );
};

export default DragListener;
