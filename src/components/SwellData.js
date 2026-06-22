import { useState, useEffect } from "react";
import { convertAngleToString } from "./methods/convertAngleToString";

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
		const currentHour = new Date().getHours();
		const i = currentHour;

		setWaveHeight(data.hourly.wave_height[i]);
		setWaveDir(data.hourly.wave_direction[i]);
		setWavePeriod(data.hourly.wave_period[i]);
	};

	useEffect(() => {
		fetchWaveData().catch(console.error);
	}, []);


	const waveDirString = convertAngleToString(waveDir)

	return (
		<div>
			<br />
			<h4>Swell:</h4>

			<p>
				Height: {waveHeight !== null ? `${Math.round(waveHeight * 3.28 * 100) / 100} ft` : "Loading..."}
			</p>

			<p>
				Direction: {waveDirString !== null ? `${waveDirString}` : "Loading..."}
			</p>

			<p>
				Period: {wavePeriod !== null ? `${wavePeriod} sec` : "Loading..."}
			</p>
		</div>
	);
};

export default SwellData;