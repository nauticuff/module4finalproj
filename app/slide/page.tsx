'use client';

import { Button } from '@/components/ui/button';
import React, { useRef, useState } from 'react';

const Form = (shortPressDuration = 1000) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const nextPage = () => {
    setCurrentPageIndex(currentPageIndex + 1);
  };

  const prevPage = () => {
    setCurrentPageIndex(currentPageIndex - 1);
  };

  //Above no matter
  const [pressing, setPressing] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleMouseDown = (): void => {
    timeoutRef.current = window.setTimeout(() => {
      setPressing(false);
      alert('LONG press detected');
    }, shortPressDuration);
    setPressing(true);
  };

  const handleMouseUp = (): void => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    if (pressing) {
      alert('Short press detected');
    }
    setPressing(false);
  };

  const handleMouseLeave = (): void => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }
    setPressing(false);
  };

  return (
    <div className='form-container overflow-hidden'>
      <div
        className='form-wrapper flex transition-transform duration-500 ease-in-out'
        style={{ transform: `translateX(-${currentPageIndex * 100}%)` }}
      >
        <div className='form-page w-full'>
          <h2>Form Page 1</h2>
          <input type='text' placeholder='Input field' />
          <button onClick={nextPage}>Next</button>
        </div>
        <div className='form-page w-full'>
          <h2>Form Page 2</h2>
          <input type='text' placeholder='Input field' />
          <button onClick={prevPage}>Previous</button>
        </div>
        {/* Add more form pages as needed */}
      </div>
      <div className='m-4 h-52 rounded-md bg-neutral-500 p-4 text-black'>
        <Button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          Press
        </Button>
      </div>
    </div>
  );
};

export default Form;
