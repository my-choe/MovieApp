import React from 'react'
import { Col } from 'antd';

function GridCards(props) {

    if(props.landingPage) {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width: '100%', height: '550px'}} src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
                <div style={{ position: 'relative' }}>
                    <img style={{width: '100%', height: '550px'}} src={props.image ? props.image : process.env.PUBLIC_URL + '/img/profile.png' } alt={props.castName}/>
                    <span>
                        <span style={{ fontWeight:'800', fontSize: '15pt'}}>{props.castName}</span>
                        <p style={{ fontSize: '12pt'}}>{props.character}</p>
                    </span>
                </div>
            </Col>
        )
    }
    
}

export default GridCards
