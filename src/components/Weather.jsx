import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../weather.css";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";

const Weather = ({ userLocation }) => {
  const [data, setData] = useState([]);
  const API = `https://api.openweathermap.org/data/2.5/weather?q=${userLocation}&appid=${
    import.meta.env.VITE_CURRENT_WEATHER_KEY
  }&units=metric`;
  useEffect(() => {
    axios
      .get(API)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  }, [userLocation]);
  console.log(data);
  return (
    <div className="location_centr">
      {data.name ? (
        <div className=" weather_box">
          <div>
            <div className="weather_image">
              <img
                src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@4x.png`}
                alt=""
              />
            </div>
            <h1 className="temp"> {data?.main?.temp.toFixed()}℃ </h1>
            <p className="name">
              {data.name}, {data?.sys?.country}
            </p>
            <div></div>
          </div>
          <div className="flex"></div>
        </div>
      ) : (
        <ToastContainer />
      )}
    </div>
  );
};

export default Weather;

Weather.propTypes = {
  userLocation: PropTypes.string.isRequired,
};
