import React from 'react';
import Tilt from 'react-tilt'
import brain from './brain.png'
import './Logo.css';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2 pa2" options={{ max: 55 }} style={{ height:  180, width: 180 }} >
                <div className="Tilt-inner pa3">
                    <div className="ma2"><img src={brain} alt="Brain logo" srcSet=""/></div>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;