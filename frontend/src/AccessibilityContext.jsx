import React, { createContext, useState, useEffect, useContext } from 'react';

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [darkContrast, setDarkContrast] = useState(false);
  const [invert, setInvert] = useState(false);
  const [saturation, setSaturation] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [textSize, setTextSize] = useState(100);

  useEffect(() => {
    // Apply visual filters
    const filters = [];
    if (darkContrast) filters.push('contrast(150%) brightness(80%)');
    if (invert) filters.push('invert(100%) hue-rotate(180deg)');
    if (saturation) filters.push('saturate(200%)');
    
    document.documentElement.style.filter = filters.length > 0 ? filters.join(' ') : 'none';
    
    // Smooth transition for root
    document.documentElement.style.transition = 'filter 0.3s ease';

    // Apply text size
    document.documentElement.style.fontSize = `${textSize}%`;

    // Toggle classes
    if (hideImages) document.body.classList.add('hide-images');
    else document.body.classList.remove('hide-images');

    if (highlightLinks) document.body.classList.add('highlight-links');
    else document.body.classList.remove('highlight-links');

  }, [darkContrast, invert, saturation, hideImages, highlightLinks, textSize]);

  const resetAll = () => {
    setDarkContrast(false);
    setInvert(false);
    setSaturation(false);
    setHideImages(false);
    setHighlightLinks(false);
    setTextSize(100);
  };

  return (
    <AccessibilityContext.Provider value={{
      darkContrast, setDarkContrast,
      invert, setInvert,
      saturation, setSaturation,
      hideImages, setHideImages,
      highlightLinks, setHighlightLinks,
      textSize, setTextSize,
      resetAll
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);
