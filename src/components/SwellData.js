import { useState, useEffect } from "react";

const SwellData = () => {
	const [waveHeight, setWaveHeight] = useState(null);
	const [waveDir, setWaveDir] = useState(null);
	const [wavePeriod, setWavePeriod] = useState(null);

	const fetchWaveData = async () => {
		const url =
			"https://marine-api.open-meteo.com/v1/marine?latitude=39.35&longitude=-74.30&hourly=wave_height,wave_direction,wave_period&timezone=America/New_York";

		const res = await fetch(url);
		const data = await res.json();

		// IMPORTANT: index 0 = current forecast hour
		const i = 0;

		setWaveHeight(data.hourly.wave_height[i]);
		setWaveDir(data.hourly.wave_direction[i]);
		setWavePeriod(data.hourly.wave_period[i]);
	};

	useEffect(() => {
		fetchWaveData().catch(console.error);
	}, []);


	const swellDirArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]


	const displaySwellDirAsString = (waveDir) => {
		let waveDirAsString = ''
		const waveSectorIndex = Math.round(waveDir / 22.5)
		if (waveDir < 1) {
			waveDirAsString = 'N'
		} else {
			waveDirAsString = swellDirArray[waveSectorIndex]
		}
		return waveDirAsString
	}

	const waveDirString = displaySwellDirAsString(waveDir)


	return (
		<div>
			<br />
			<h4>Wave Conditions:</h4>

			<p>
				Height: {waveHeight !== null ? `${Math.round(waveHeight * 3.28 * 100) / 100} ft` : "Loading..."}
			</p>

			<p>
				Direction: {waveDirString !== null ? `${waveDirString}°` : "Loading..."}
			</p>

			<p>
				Period: {wavePeriod !== null ? `${wavePeriod} s` : "Loading..."}
			</p>
		</div>
	);
};

export default SwellData;