import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = () => {
    return (
        <div>
            <p className='f3'>
                {'This app will detect faces in your pictures.'}
            </p>
            <div className='center'>
            <div className='form center pa4 br3 shadow-2'>
                <input className='f4 pa2 w-70 center' type="text" name="" id="" />
                    <button className='w-30 br3 f4 link ph3 pv2 dib black bg-light-red courier ttu tracked b'>Detect</button>
            </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;