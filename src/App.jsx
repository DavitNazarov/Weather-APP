import { useState } from "react";
import Weather from "./components/Weather";
import "./index.css";
function App() {
  const [send, setSend] = useState("");
  const [location, setLocation] = useState("");
  // send location into state to show weather
  const submitHandler = (e) => {
    if (e.key === "Enter") {
      setSend(location);
      e.preventDefault();
    }
  };
  return (
    <section className="_conteiner">
      <div className=" location_centr ">
        <div className="w-100">
          <input
            className="weather_Input"
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            onKeyPress={submitHandler}
            placeholder="Enter Location ..."
          />
        </div>
      </div>
      {send ? <Weather userLocation={location} /> : null}
    </section>
  );
}

export default App;
