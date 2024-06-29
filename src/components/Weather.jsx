import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../weather.css";

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
        toast.error("City not foud pleace type agein");
      });
  }, []);
  console.log(data);
  return (
    <div className="location_centr">
      <div className=" weather_box">
        <div>
          <p className="name">
            {data.name}, {data?.sys?.country}
          </p>
        </div>
        <div className="flex">
          <h1 className="temp"> {data?.main?.temp.toFixed()}℃ </h1>
          <img src="  https://openweathermap.org/img/wn/10d@4x.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Weather;
