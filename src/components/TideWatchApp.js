// Jason Bahr
// May 10, 2021
// This app will show you the tidal data for the Atlantic City NOAA station

import Location from './Location'
import Tides from './Tides'
import Temps from './Temps'
import WindData from './WindData'
import { TideDiv } from './tideStyle'
import SwellData from './SwellData'

function TideWatch() {

  const pageRefresh = () => {
    window.location.reload(false);
  }

  return (
    <TideDiv>
      <div className='tideBody'>
        <Location />
        <Tides className='tides' />
        <Temps className='temps' />
        <h3>Wind & Wave Forecast</h3>
        <WindData className='wind' />
        <SwellData className='swell' />
        <br />
        <button className='refresh-button' onClick={pageRefresh}>Refresh</button>
        <br />
        <p>Brought to you by <a href="https://www.instagram.com/jbahr_insta/">@jbahr_insta</a></p>
      </div>
      
    </TideDiv>
  );
}

export default TideWatch;
