import { useState } from "react";




export default function Home() {

  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_KEY}&lang=sv`;
 

  const Search = async () => {
    try{
        const response = await fetch(url);

        if(!response.ok)
        {
          throw error;
        }

        const data = await response.json();
        setData(data);
        setError("");
      
    }catch{
      setError("Något är pajj..")
      console.log(error);
    }
  }


  
  let flagContent;
  let content;
  if(Object.keys(data).length === 0 && error === ''){
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

    //CURRENT WEATHER DATA
    const kelvin = -273.17;
    const tempToC = data.main.temp + kelvin;
    const hiTempToC = data.main.temp_max + kelvin;
    const loTempToC = data.main.temp_min + kelvin;
    const description = data.weather[0].description;
    const fixedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    const owIcons = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const flagIcon = data.sys.country;
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
              <p>{data.wind.speed} m/s</p>
            </div>
            <div className="col-6 align-self-center mt-2">
              <img src="/icons/humidity.png" width={40} height={40} alt='Humidity symbol' />
              <p className="">{data.main.humidity} %</p>
          </div>
        </div>
      </div>
      <div className="row">
          
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


