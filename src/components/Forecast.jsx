import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Forecast = ({ lat, lon }) => {
  const [data, setData] = useState([]);
  const API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${
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
  }, [API]);
  console.log(data);

  return <div>Forecast</div>;
};

export default Forecast;

Forecast.propTypes = {
  lat: PropTypes.number.isRequired,
  lon: PropTypes.number.isRequired,
};
