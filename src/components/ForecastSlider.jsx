import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import "./forecastSlider.css";

const ForecastSlider = ({ list, autoSlideInterval = 2000 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const autoSlideIntervalRef = useRef(null);
  const startDragging = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    clearInterval(autoSlideIntervalRef.current);
  };

  const stopDragging = () => {
    setIsDragging(false);
    autoSlide();
  };

  const onDragging = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };
  console.log(list);
  const autoSlide = () => {
    clearInterval(autoSlideIntervalRef.current); // Clear any existing interval
    autoSlideIntervalRef.current = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft += sliderRef.current.clientWidth;
        if (
          sliderRef.current.scrollLeft >=
          sliderRef.current.scrollWidth - sliderRef.current.clientWidth
        ) {
          sliderRef.current.scrollLeft = 0;
        }
      }
    }, autoSlideInterval);
  };

  useEffect(() => {
    autoSlide();
    return () => clearInterval(autoSlideIntervalRef.current); // Cleanup interval on component unmount
  }, []);

  return (
    <div
      className="slider"
      ref={sliderRef}
      onMouseDown={startDragging}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      onMouseMove={onDragging}
      onTouchStart={startDragging}
      onTouchEnd={stopDragging}
      onTouchMove={onDragging}
    >
      <div className="slider-content">
        {list?.list?.map((item) => (
          <div key={item.dt} className="slider-item">
            <p>{item?.weather[0]?.description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item?.weather[0]?.icon}@2x.png`}
              alt=""
            />
            <p className="forecastSlider_desc">
              {item?.main?.temp.toFixed()} ℃
            </p>
            <p className="forecastSlider_desc">{item.dt_txt.slice(11, 16)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastSlider;

ForecastSlider.propTypes = {
  list: PropTypes.array.isRequired,

  autoSlideInterval: PropTypes.number.isRequired,
};
