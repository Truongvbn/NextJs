'use client';
import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

const SlickSlider = ({ title, items, renderItem }) => {
  const sliderRef = useRef(null);
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const settings = {
    dots: false,
    infinite: items.length > 4,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  useEffect(() => {
    const equalizeCardHeights = () => {
      if (sliderRef.current) {
        const slideNodes =
          sliderRef.current.innerSlider.list.querySelector('.slick-track').childNodes;
        let maxHeight = 0;
        slideNodes.forEach((slide) => {
          const slideContent = slide.querySelector('.card-content');
          if (slideContent) {
            slideContent.style.height = 'auto';
            maxHeight = Math.max(maxHeight, slideContent.offsetHeight);
          }
        });
        slideNodes.forEach((slide) => {
          const slideContent = slide.querySelector('.card-content');
          if (slideContent) {
            slideContent.style.height = `${maxHeight}px`;
          }
        });
      }
    };

    equalizeCardHeights();
    window.addEventListener('resize', equalizeCardHeights);

    return () => {
      window.removeEventListener('resize', equalizeCardHeights);
    };
  }, [items]);

  return (
    <div className="mb-24 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h2>
        {/* <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
          View All <Maximize2 className="ml-2 w-4 h-4" />
        </button> */}
      </div>
      <div className="relative px-4 sm:px-8 lg:px-12">
        <Slider ref={sliderRef} {...settings}>
          {items.map((item, index) => (
            <div key={index} className="px-4 sm:px-6">
              <motion.div
                className="card-content h-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {renderItem(item)}
              </motion.div>
            </div>
          ))}
        </Slider>
        <AnimatePresence>
          {currentSlide > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={goToPrev}
              className="absolute -left-4 sm:-left-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 z-20"
            >
              <ChevronLeft
                className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
              />
            </motion.button>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {currentSlide < items.length - settings.slidesToShow && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={goToNext}
              className="absolute -right-4 sm:-right-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 z-20"
            >
              <ChevronRight
                className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      <div className="mt-8 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(items.length / settings.slidesToShow) }).map((_, index) => (
          <button
            key={index}
            onClick={() => sliderRef.current.slickGoTo(index * settings.slidesToShow)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              Math.floor(currentSlide / settings.slidesToShow) === index
                ? 'bg-blue-600 dark:bg-blue-400 w-4'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlickSlider;
