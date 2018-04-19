import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2 pa2" options={{ max: 55 }} style={{ height:  180, width: 180 }} >
                <div className="Tilt-inner">
                    <div className="ma2"><span role="img" aria-labelledby="panda1">👽</span></div>
                    <p className="silver f3 courier b">I WANT TO BELIEVE</p>
                     </div>
            </Tilt>
        </div>
    )
}

export default Logo;