import getData from './methods/getData'
import { useState, useEffect } from 'react'

const Location = () => {

  const waterTempURL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=8534720&product=water_temperature&datum=STND&time_zone=lst_ldt&units=english&format=json'

  const [location, setLocation] = useState(0)
  const [name, setName] = useState('')
  const [lat, setLat] = useState(0.0)
  const [long, setLong] = useState(0.0)

  const setLocationData = async () => {
    const data = await getData(waterTempURL)
    setLocation(data.metadata.id)
    setName(data.metadata['name'])
    setLat(data.metadata['lat'])
    setLong(data.metadata['lon'])
  }

  useEffect(() => {
    setLocationData()
  }, [])

  const localTime = new Date().toLocaleTimeString();
  

  return (
    <div className='location'>
      <h1>{name}</h1>
      <h2>Live Conditions</h2>
      <p>Updated: {localTime}</p>
      {/* <div className='locationStats'>
        <h4>Lat: {lat}</h4>
        <h4>Long: {long}</h4>
        <h4>NOAA Station Id: {location}</h4>
      </div> */}
      
    </div>
  )
}

export default Location
