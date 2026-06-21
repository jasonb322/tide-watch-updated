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
        <h4>Live Data</h4>
        <Location />
        <Tides className='tides' />
        <Temps className='temps' />
        <h4>Predicted Data</h4>
        <WindData className='wind' />
        <SwellData className='swell' />
        <br />
        <button className='refresh-button' onClick={pageRefresh}>Refresh</button>
        <br />
        <p>Developed by @jbahr_insta</p>
      </div>
      
    </TideDiv>
  );
}

export default TideWatch;
