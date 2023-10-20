import { useState } from "react";
import Forecast from "./Components/Forecast";

export default function Home() {

  const [current, setCurrent] = useState({});
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState(null);


  const url = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_KEY}&lang=sv`);
  const forecasturl = fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.REACT_APP_KEY}&lang=sv`); 

  const Search = async () => {

    try{
    Promise.all([url, forecasturl])
    .then(async (response) => {
      const currentResponse  = await response[0].json();
      const forecastResponse = await response[1].json();

      setCurrent(currentResponse);
      setForecast(forecastResponse);
      setError("");
      console.log(current, forecast)
    })
 
    }catch{
      setError("Fail")
      console.log(error);
    }
  }


  
  let flagContent;
  let content;
  if(Object.keys(current, forecast).length === 0 && error === ''){
    content = (
      <>
       <h1 className="display-5 mt-3">Välkommen till SolGlimt</h1>
       <div className="sun-container">
         <img src="/icons/01d.png"  alt="Sun" />
       </div>
      </>
    );
  } else if(error !== "") {
    content = (
      <div className="mt-4">
        <p>Kunde inte hitta din stad.<br />Är du säker på att du bor på planeten jorden?😉</p>
      </div>
    );
  } else {

    //CURRENT WEATHER current
    const kelvin = -273.17;
    const tempToC = current.main.temp + kelvin;
    const hiTempToC = current.main.temp_max + kelvin;
    const loTempToC = current.main.temp_min + kelvin;
    const description = current.weather[0].description;
    const fixedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    const owIcons = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    const flagIcon = current.sys.country;
    const fixedFlagIcon ="/flags/"+ flagIcon.toLowerCase()+".png";

    flagContent = (
      <div className="flag-container">
        <img src={fixedFlagIcon} width={50} height={36} alt="Country flag" />
      </div>
    );

    content = (
      <>
        <div className='container text-center' id="content-container">
          <div className="row">
            <div className="current-weather">
              <img src={owIcons} width={120} height={120} alt="current wheather" className="currentwheatericon"/>
            </div>
          </div>
          <p className="lead">{fixedDescription}</p>
          <h1 className="display-4">{tempToC.toFixed(1)}&deg;C</h1>
          <div className="row">
            <div className="col-6">
              <p className="lead hi-lo">Högsta <br/>{hiTempToC.toFixed(1)}&deg;C</p>
            </div>
            <div className="col-6">
                <p className="lead hi-lo">Lägsta <br/> {loTempToC.toFixed(1)}&deg;C</p>
              </div>
          </div>
          <div className="row justify-content-between align-items-center">
            <div className="col-6 align-self-center">
              <img src="icons/wind.png" width={50} height={50} alt='Wind symbol' />
              <p>{current.wind.speed} m/s</p>
            </div>
            <div className="col-6 align-self-center mt-2">
              <img src="/icons/humidity.png" width={40} height={40} alt='Humidity symbol' />
              <p className="">{current.main.humidity} %</p>
          </div>
        </div>
        <Forecast data={forecast}/>
      </div>
      
        
      
    </>
    )
  }

  return (
    <div className="container-fluid" id="main-container">
      <div className="container py-3 text-center">
        <div className="input-group align-items-center">
          <input type="search" autoComplete="off" className="form-control shadow-none" id="bs-form" placeholder="Ange en plats" aria-label="Search"  value={location} onChange={(e) => setLocation(e.target.value)} />
          <button type="button" id="search-button" className="btn btn-outline-warning text-dark" onClick={Search}>Sök</button>
          {flagContent}
        </div>
        <div className="container">
          {content}
        </div>
      </div>
    </div>
  )
}


