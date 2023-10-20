import { Sidebar, Menu, SubMenu } from 'react-pro-sidebar';

export default function Forecast({ data }) {

  return (
<Sidebar>
  <Menu>
    <SubMenu label="Prognos för 3 dagar">
    {data.list.slice(0,1).map((item, id) => 
      <div className='custom-row' key={id}>
        <div>
          <p className='mt-3'>{item.dt_txt.slice(5,10).replace('-','/' )}</p>
        </div>
        <div>
          <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} width={60} alt='current weather' />
        </div>
        <div>
          <p className='mt-2'>{Math.round(item.main.temp)-273}&deg;C<br/>{Math.round(item.wind.speed)}m/s</p>
        </div>     
      </div>
    )}
     {data.list.slice(8,9).map((item, id) => 
      <div className='custom-row' key={id}>
      <div>
        <p className='mt-3'>{item.dt_txt.slice(5,10).replace('-','/' )}</p>
      </div>
      <div>
      <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} width={60} alt='current weather' />
      </div>
      <div>
      <p className='mt-2'>{Math.round(item.main.temp)-273}&deg;C<br/>{Math.round(item.wind.speed)}m/s</p>
      </div>     
    </div>
    )}
    {data.list.slice(16,17).map((item, id) => 
      <div className='custom-row' key={id}>
      <div>
        <p className='mt-3'>{item.dt_txt.slice(5,10).replace('-','/' )}</p>
      </div>
      <div>
      <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} width={60} alt='current weather' />
      </div>
      <div>
      <p className='mt-2'>{Math.round(item.main.temp)-273}&deg;C<br/>{Math.round(item.wind.speed)}m/s</p>
      </div>     
    </div>
    )} 
    </SubMenu>
  </Menu>
</Sidebar>
  )
}
