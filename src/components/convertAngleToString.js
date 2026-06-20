// converts compass angle to String direction
export const convertAngleToString = (angle) => {
	const compassArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]
	let angleToString = ''
	const sectorIndex = Math.round(rawWindDir / 22.5)
	if (rawWindDir < 1) {
		angleToString = 'N'
	} else {
		angleToString = compassArray[sectorIndex]
	}
	return angleToString
}