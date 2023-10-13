import { useState } from "react";


export default function Home() {

  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_KEY}&lang=sv`;
  
  const Search = async (e) => {
    try{
      if(e.key === "Enter"){
        e.preventDefault();
        const response = await fetch(url);
        
        if(!response.ok)
        {
          throw error;
        }
        const data = await response.json();
        setData(data);
        setError("");
      }
    }catch{
      setError("Något är pajj..")
      console.log(error);
    }
  }

  console.log(process.env)

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

    const kelvin = -273.17;
    const tempToC = data.main.temp + kelvin;
    const hiTempToC = data.main.temp_max + kelvin;
    const loTempToC = data.main.temp_min + kelvin;
    const description = data.weather[0].description;
    const fixedDescription = description.charAt(0).toUpperCase() + description.slice(1);
    const owIcons = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const flagIcon = data.sys.country;
    const fixedFlagIcon ="/flags/"+flagIcon.toLowerCase()+".png";

    console.log(data);

    content = (
      <div className='container'>
        <div className="flag-container text-end">
          <img src={fixedFlagIcon} width={100} height={70} alt="Country flag" />
        </div>
        <div>
          <img src={owIcons} alt="current wheather"/>
        </div>
        <p className="lead">{fixedDescription}</p>
        <h1 className="display-4">{tempToC.toFixed(1)}&deg;C</h1>
        <div className="row justify-content-between mt-4">
          <div className="col-6 pt-2">
            <img src="icons/wind.png" width={50} height={50} alt='Wind symbol' />
            <p>{data.wind.speed} m/s</p>
          </div>
          <div className="col-6 pt-3 align-self-center">
            <img src="/icons/humidity.png" width={40} height={40} alt='Humidity symbol' />
            <p>{data.main.humidity} %</p>
        </div>
      </div>
      <div className="container mt-3" id="hi-lo">
        <div className="row justify-content-center align-items-center gx-4">
          <div className="col-6 pt-3 align-self-center">
          <p className="lead">Högsta <img src="/icons/down.png" width={20} height={20} alt="down" id="arrow" /></p>
          <p className="lead">{hiTempToC.toFixed(1)}&deg;C</p>
          </div>
          <div className="col-6 pt-3 align-self-center">
          <p className="lead">Lägsta <img src="/icons/down.png" width={20} height={20} alt="down" /></p>
          <p className="lead">{loTempToC.toFixed(1)}&deg;C</p>
          </div>
        </div>
      </div>
    </div>
    )
  }

  return (
    <main>
      <div className="container text-center">
        <input autoComplete="off" className="display-4" id="location" placeholder="Ange en plats:" value={location} onChange={(e) => setLocation(e.target.value)} onKeyDown={Search}/>
        {content}
      </div>
    </main>
  )
}