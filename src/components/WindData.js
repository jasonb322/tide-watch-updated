import { useState, useEffect } from 'react'
import { openWeatherMapAPIKey } from './apiKeys'
import getData from './getData';


const WindData = () => {
    const [windDir, setWindDir] = useState(0);
    const [windSpeed, setWindSpeed] = useState(null);

    // .length of windDirArray = 17
    const windDirArray = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"]
    

    const displayWindDirAsString = (rawWindDir) => {
        let windAsString = ''
        const windSectorIndex = Math.round(rawWindDir/22.5)
        if (rawWindDir < 1) {
            windAsString = 'N'
        } else {
            windAsString = windDirArray[windSectorIndex]
        }
        return windAsString
    }

    const fetchWindData = async () => {

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
            <h4>Wind:</h4>
            <h4>{ windDir ? displayWindDirAsString(windDir) : 'Data Not Available' } @ { windSpeed ? windSpeed : ''} mph</h4>
        </div>
    )
}

export default WindData
