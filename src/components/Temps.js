import { useState, useEffect } from 'react'
import getData from './getData'


const Temps = () => {

  // NOAA Tides and Currents API - Water Temp URL
  const waterTempURL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=8534720&product=water_temperature&datum=STND&time_zone=lst_ldt&units=english&format=json'

  // can't combine requests, URL for air temp
  const airTempURL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?date=latest&station=8534720&product=air_temperature&datum=STND&time_zone=lst_ldt&units=english&format=json'

  const [waterTemp, setWaterTemp] = useState('')
  const [airTemp, setAirTemp] = useState('')
  
  // call getData to set water temp
  const getWaterTemp = async () => {
    const data = await getData(waterTempURL)
    setWaterTemp(data.data[0].v)
  }

  // call getData to set water temp
  const getAirTemp = async () => {
    const data = await getData(airTempURL)
    setAirTemp(data.data[0].v)
  }

  // update values when page loads and whenever there is a change to water or air temps
  useEffect(() => {
    getWaterTemp()
    getAirTemp()
  }, [waterTemp, airTemp])

  // display information on the page
  return (
    <div className='temps'>
      <br />
      <h4>Water: {waterTemp} ˚F</h4 >
      <h4 className='air-temp'>Air: {airTemp} ˚F</h4 >
    </div>
  )
}

export default Temps
