// Jason Bahr
// May 10, 2021
// This app will show you the tidal data for the Atlantic City NOAA station

import Location from './Location'
import Tides from './Tides'
import Temps from './Temps'
import { TideDiv } from './tideStyle'

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
        <button className='refresh-button' onClick={pageRefresh}>Refresh</button>
      </div>
      
    </TideDiv>
  );
}

export default TideWatch;
