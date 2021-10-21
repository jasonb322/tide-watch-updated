/* Control functionality of the tide API call and return formatted tide times */

import getData from "./getData"
import { useState, useEffect } from 'react'

const Tides = () => {


  //===============================================================
  //
  // FORMAT URL FOR API REQUEST 
  //
  //===============================================================

  // tide info returned in format -> "2021-06-11 08:58",

  // converts numbers to two digits (String type), example 1 = 01
  // feeds into the automated URL for current date on API call
  function convertToTwoDigit(val) {
    if (val < 10) {
      val = val.toString()
      val = "0" + val
    }
    return val
  }

  // formats the current date (local time) to YYYYMMDD, for use in API call.
  function dateFormatter() {
    let date = new Date()
    // console.log(date)

    let day = date.getDate()
    day = convertToTwoDigit(day)
    // console.log(day)

    let month = date.getMonth() + 1
    month = convertToTwoDigit(month).toString()
    // console.log(month)

    const year = date.getFullYear()

    const combined = year + month + day
    return combined.toString()
  }

  // store the formatted date to var
  const formattedDate = dateFormatter()

  // interpolate the URL used for the tide call to the API
  const tideURL = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=${formattedDate}&range=48&station=8534720&product=predictions&datum=STND&time_zone=lst_ldt&interval=hilo&units=english&format=json`
  // console.log(tideURL)

  // TEST URL - See tide information returned from API ///////////////////////////////
  // const testURL = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?begin_date=20210611&range=48&station=8534720&product=predictions&datum=STND&time_zone=lst_ldt&interval=hilo&units=english&format=json'
  // console.log(testURL)



  //===============================================================
  //
  // PREPARE TIDES FOR DISPLAY IN BROWSER
  //
  //===============================================================

  const [tide1, setTide1] = useState('')
  const [tide2, setTide2] = useState('')
  const [tide3, setTide3] = useState('')
  const [tide4, setTide4] = useState('')

  const [currentDate, setCurrentDate] = useState('')

  const [tide1Type, setTide1Type] = useState('')
  const [tide2Type, setTide2Type] = useState('')
  const [tide3Type, setTide3Type] = useState('')
  const [tide4Type, setTide4Type] = useState('')

  // convert the API's returned time to 12 hour time
  function convertTideTimeTo12Hour(tide) {
    let tideTime = tide.substring(tide.length - 5)
    let hour = tideTime.substring(0, 2)

    if (hour >= 12) {
      if (hour > 12) {
        hour -= 12
      }
      tideTime = hour + tideTime.substring(2)
      return tideTime + " PM"
    } else if (hour === '00') {
        hour = '12'
        tideTime = hour + tideTime.substring(2)
        return tideTime + " AM"
    } else {
        return tideTime + " AM"
    }
  }

  // convert the returned single letter tide type to "low" or "high"
  function convertTideType(tideType) {
    if (tideType === 'L') {
      return 'Low: '
    } else {
      return 'High: '
    }
  }

  // formatDate may be unecessary as the Date object may return 3-letter month, look into later to clean up code
  // format current date
  function formatDate(tide) {
    const y = tide.substring(0, 4)
    let m = tide.substring(5, 7)
    const d = tide.substring(8, 10)
    switch (m) {
      case '01':
        m = 'Jan'
        break;
      case '02':
        m = 'Feb'
        break;
      case '03':
        m = 'March'
        break;
      case '04':
        m = 'April'
        break;
      case '05':
        m = 'May'
        break;
      case '06':
        m = 'June'
        break;
      case '07':
        m = 'July'
        break;
      case '08':
        m = 'Aug'
        break;
      case '09':
        m = 'Sept'
        break;
      case '10':
        m = 'Oct'
        break;
      case '11':
        m = 'Nov'
        break;
      case '12':
        m = 'Dec'
        break;
      default:
        throw Error('Unable to format month.')
    }
    return m + " " + d + ", " + y
  }


  //===============================================================
  //
  // DISPLAY TIDES IN BROWSER
  //
  //===============================================================

  // set the tide data on the UI when API call is returned
  const setTideData = async () => {
    const data = await getData(tideURL)
      .catch((err) => {
        console.log("Unable to retrieve tide data from API server.", err)
      })

    setTide1(convertTideTimeTo12Hour(data.predictions[0]['t']))
    setTide2(convertTideTimeTo12Hour(data.predictions[1]['t']))
    setTide3(convertTideTimeTo12Hour(data.predictions[2]['t']))
    setTide4(convertTideTimeTo12Hour(data.predictions[3]['t']))

    setCurrentDate(formatDate(data.predictions[0]['t']))

    setTide1Type(convertTideType(data.predictions[0]['type']))
    setTide2Type(convertTideType(data.predictions[1]['type']))
    setTide3Type(convertTideType(data.predictions[2]['type']))
    setTide4Type(convertTideType(data.predictions[3]['type']))
  }

  useEffect(() => {
    setTideData()
  })


  return (
    <div className='tides'>
      <br />
      <h2>{currentDate}</h2>
      <h4>{tide1Type} {tide1}</h4>
      <h4>{tide2Type} {tide2}</h4>
      <h4>{tide3Type} {tide3}</h4>
      <h4>{} {tide4.includes('AM') ? "": tide4Type + " " + tide4}</h4>
    </div>
  )
}

export default Tides