import { useState, useEffect } from 'react'
import getData from './getData';


const WindData = () => {
    const [windDir, setWindDir] = useState(0);
    const [windSpeed, setWindSpeed] = useState(null);

    // .length of windDirArray = 17
    const windDirArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]


    const displayWindDirAsString = (rawWindDir) => {
        let windAsString = ''
        const windSectorIndex = Math.round(rawWindDir / 22.5)
        if (rawWindDir < 1) {
            windAsString = 'N'
        } else {
            windAsString = windDirArray[windSectorIndex]
        }
        return windAsString
    }

    const fetchWindData = async () => {

        const windURL =
            'https://api.open-meteo.com/v1/forecast?latitude=39.35&longitude=-74.30&hourly=windspeed_10m,winddirection_10m,windgusts_10m&timezone=America/New_York'

        const data = await getData(windURL)

        // first hourly forecast point
        const currentWindDir = data.hourly.winddirection_10m[0]
        const currentWindSpeed = data.hourly.windspeed_10m[0]

        setWindDir(currentWindDir)
        setWindSpeed(Math.round(currentWindSpeed))

        return data
    }

    useEffect(() => {
        fetchWindData().catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <h4>Wind:</h4>
            <h4>{(windDir != null && windSpeed != null) ? `${displayWindDirAsString(windDir)} @ ${windSpeed} mph` : 'Man, wind still broken :('}</h4>
        </div>
    )
}

export default WindData
