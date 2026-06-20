import { useState, useEffect } from 'react'
import getData from './getData';
import { convertAngleToString } from './convertAngleToString';


const WindData = () => {
    const [windDir, setWindDir] = useState(0);
    const [windSpeed, setWindSpeed] = useState(null);
    const [windGust, setWindGust] = useState(null);

    const fetchWindData = async () => {

        const windURL =
            'https://api.open-meteo.com/v1/forecast?latitude=39.35&longitude=-74.30&hourly=windspeed_10m,winddirection_10m,windgusts_10m&timezone=America/New_York'

        const data = await getData(windURL)

        // first hourly forecast point

        const currentHour = new Date().getHours();
		const i = currentHour;

        const currentWindDir = data.hourly.winddirection_10m[i]
        const currentWindSpeed = data.hourly.windspeed_10m[i]
        const currentGust = data.hourly.windgusts_10m[i]

        setWindDir(currentWindDir)
        setWindSpeed(Math.round(currentWindSpeed))
        setWindGust(Math.round(currentGust))

        return data
    }

    const windDirString = convertAngleToString(windDir)


    useEffect(() => {
        fetchWindData().catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <h4>Wind:</h4>
            <p>
                {
                    (windDir !== null && windSpeed !== null)
                        ? windDirString + " @ " + windSpeed + " mph - Gust: " + windGust + "  mph"
                        : 'Data Unavailable'
                }
            </p>
        </div>
    )
}

export default WindData
