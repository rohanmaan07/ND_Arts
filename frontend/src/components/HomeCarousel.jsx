import React, { useState, useEffect } from 'react';
import { carouselData } from '../Data/MainC';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Loader } from '../Pages/Loader';

function HomeCarousel() {
  const [loading, setLoading] = useState(true);

  // Once component mounts or images load, turn off loading
  useEffect(() => {
    // Simple timeout to simulate loading, replace with real logic if needed
    const timer = setTimeout(() => setLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  const items = carouselData.map((item) => (
    <img
      key={item.image}
      className="w-full h-[100%] sm:h-[600px] object-cover cursor-pointer"
      role="presentation"
      src={item.image}
      alt=""
      onLoad={() => setLoading(false)} // you can improve this to detect when all images loaded
    />
  ));

  if (loading) {
    return <Loader />;
  }

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={1000}
      infinite
    />
  );
}

export default HomeCarousel;
