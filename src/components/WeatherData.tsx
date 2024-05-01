import  { useState } from 'react'
import '@/weather.css'
import backImg from '/backImg.jpg'
import axios from 'axios'


const WeatherData = () => {

  const [data, setData] = useState([]);
  const [err, setErr] = useState([]);
  
  const [userCity, setUserCity] = useState('')

  const weather_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=${import.meta.env.VITE_CURRENT_WEATHER_API}&units=metric`;
  const searchLocation = (e: { key: string; })=>{
    if (e.key === "Enter") {
        axios.get(weather_API_URL)
        .then(async (resp) => {
          setData(await resp.data);
        })
        .catch((err) => {
          setErr(err);
        });
      setUserCity("");
    }
  }
 
  return (
  <>
        <div className='conteiner' style={{backgroundImage: `url(${backImg})`}}>
            <div className='weather_input_conteiner'>
                    <input 
                        className='weather_input' 
                        type="text" 
                        placeholder='Enter City Name here...' 
                        value={userCity} 
                        onChange={(e)=> setUserCity(e.target.value)}
                        onKeyPress={searchLocation}
                        
                    />
            </div>
       
            {/* Fetch resilt here! */}
                  {data.name ? (  <div className='weather_fetch_conteiner'>
                <div className='weather_fetch_res_back'>
                    <div className='weather_fetch_res'>
                        {data.name ? <h1 className='city_name'>{data.name} , {data.sys ? data.sys.country :null}</h1> :null}
                        
                        <div className='weather_fetch_res_main_inf'>

                            <div>
                                <img src={`https://openweathermap.org/img/wn/${data.weather ? data.weather[0].icon : null}@2x.png`} alt={`${data.weather ? data.weather[0].description :null}`} title={`${data.weather ? data.weather[0].description :null}`}/>
                            </div>

                            <div>
                                {data.main ?  <h3 className='temp_inf'>{data.main.temp.toFixed()}°C</h3> :null}
                                <p className='weather_desc'>{data.weather ? data.weather[0].description :null}</p>
                            </div>

                        </div>
                        <div className='weather_fetch_res_optional_inf'>
                            <div>
                                <h4 className='optianal_text'>Wind</h4>
                                <p className='optional_num'>{data.wind ? data.wind.speed.toFixed() : null}  km/h</p>
                            </div>
                            <div>
                                <h4 className='optianal_text'>Feels like</h4>
                                {data.main ?  <p className='optional_num'>{data.main.feels_like.toFixed()}°C</p> :null}
                            </div>
                            <div>
                                <h4 className='optianal_text'>min. Temperature </h4>
                                {data.main ?  <p className='optional_num'>{data.main.temp_min.toFixed()}°C</p> :null}
                                
                            </div>
                        
                        </div>
                    

                    </div> 
                </div>
            </div> ) : (
                <>
                    {err.message ? (
                        <> 
                            <h1>Ooops! {err.message} </h1>
                            <p> Please try anather location!!</p>
                        </>
                    ) :null}
                   
                </>
            )  }  
        </div>
 
  </>
  )
}

export default WeatherData