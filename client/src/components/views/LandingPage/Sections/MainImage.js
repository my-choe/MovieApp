import React from 'react';

function MainImage(props){
    return (
        <div style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0)
        39%, rgba(0,0,0,0)
        41%, rgba(0,0,0,0.65)
        100%),
        url('${props.image}'), #c1c1c1`,
            height: '500px',
            backgroundSize: '100%, cover',
            backgroundPosition: 'center, center',
            width: '100%',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', maxWidth:'500px', bottom: '2rem', marginLeft:'2rem'}}>
                <h1 style={{ color:'white', fontWeight:'900', fontSize:'30pt'}}> {props.title} </h1>
                <p style={{ color: 'white', fontSize: '1rem', width: '900px'}}> {props.overview}</p>
            </div>
        </div>
    )
}

export default MainImage