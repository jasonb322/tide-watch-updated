// converts compass angle to String direction

export const convertAngleToString = (angle) => {
	const compassArray = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW", "N"]
	let angleAsString = ''
	const sectorIndex = Math.round(angle / 22.5)
	if (angle < 1) {
		angleAsString = 'N'
	} else {
		angleAsString = compassArray[sectorIndex]
	}
	return angleAsString
}