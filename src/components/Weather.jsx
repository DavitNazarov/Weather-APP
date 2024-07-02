import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../weather.css";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import { FaWind } from "react-icons/fa";
import { LuWaves, LuSunrise, LuSunset } from "react-icons/lu";
import { IconContext } from "react-icons";
import Forecast from "./Forecast";

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
  }, [API, userLocation]);

  // Convert a Unix timestamp to time

  let sunrise = data.sys?.sunrise;
  let sunset = data.sys?.sunset;

  let risedate = new Date(sunrise * 1000);
  let setdate = new Date(sunset * 1000);

  let risehours = risedate.getHours();
  let riseminutes = risedate.getMinutes();

  let setsehours = setdate.getHours();
  let seteminutes = setdate.getMinutes();

  let riseformattedDate = `${risehours}:${riseminutes}`;
  let seteformattedDate = `${setsehours}:${seteminutes}`;

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
              <p className="description">{data?.weather[0]?.description}</p>
            </div>
            <h1 className="temp"> {data?.main?.temp.toFixed()}℃ </h1>
            <p className="name">
              {data.name}, {data?.sys?.country}
            </p>
            <div className="flex justify-between pt-10">
              <IconContext.Provider value={{ size: "3rem" }}>
                <div className="flex">
                  <FaWind />
                  <div className="flex  flex-col optionalTxt ">
                    <p>{data.wind?.speed.toFixed()} km/h</p>
                    <h6> speed </h6>
                  </div>
                </div>
                <div className="flex">
                  <LuWaves />
                  <div className="flex flex-col optionalTxt ">
                    <p>{data.main?.humidity}</p>
                    <h6>Humidity </h6>
                  </div>
                </div>
              </IconContext.Provider>
            </div>
          </div>
          <IconContext.Provider value={{ size: "2rem" }}>
            <div className="flex justify-between sunshine">
              <div>
                <LuSunrise />
                <h5 className="sunFont">{riseformattedDate}</h5>
              </div>
              <div className="svg_size">
                <svg
                  width="360"
                  height="108"
                  viewBox="0 0 369 108"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.13171 105.942C81.0004 -33 296.5 -33.5 367.131 106.876"
                    stroke="#7D7777"
                    strokeWidth="2"
                  />
                  <line
                    x1="0.000427246"
                    y1="106.376"
                    x2="367.131"
                    y2="106.376"
                    stroke="#6A6464"
                  />
                </svg>
              </div>
              <div>
                <LuSunset />
                <h5 className="sunFont">{seteformattedDate}</h5>
              </div>
            </div>
          </IconContext.Provider>
          {Forecast && (
            <Forecast lat={data?.coord?.lat} lon={data?.coord?.lon} />
          )}
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
