
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = (smooth: boolean = true) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }, [location.pathname, smooth]);
};

export const scrollToTop = (smooth: boolean = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};
