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

  return (
    <div>
      <h4>Wave Conditions</h4>

      <p>
        Height: {waveHeight !== null ? `${waveHeight} m` : "Loading..."}
      </p>

      <p>
        Direction: {waveDir !== null ? `${waveDir}°` : "Loading..."}
      </p>

      <p>
        Period: {wavePeriod !== null ? `${wavePeriod} s` : "Loading..."}
      </p>
    </div>
  );
};

export default SwellData;