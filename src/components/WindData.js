import { useState, useEffect } from 'react'
import { openWeatherMapAPIKey } from './apiKeys'
import getData from './getData';


const WindData = () => {
    const [windDir, setWindDir] = useState(null);
    const [windSpeed, setWindSpeed] = useState(null);

    const fetchWindData = async () => {
        // my stats
        // const latOceanAcres = '39.7435'
        // const lonOceanAcres = '-74.281'

        const lat = '39.3643'
        const lon = '-74.4229'
        const apiKey = openWeatherMapAPIKey

        const windURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`

        
        const data = await getData(windURL)

        setWindDir(data['current']['wind_deg'])
        setWindSpeed(Math.round(data['current']['wind_speed']))

        return data        
    }

    useEffect(() => {
        fetchWindData().catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <h4>Wind Direction: { windDir ? windDir : '...'}˚</h4>
            <h4>Wind Speed: { windSpeed ? windSpeed : '...'} mph</h4>
        </div>
    )
}

export default WindData
