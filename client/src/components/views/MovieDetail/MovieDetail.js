import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import { Row } from 'antd';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    const [toggleBtnText, settoggleBtnText] = useState('Open Cast List');

    
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`


        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
        })


        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setCasts(response.cast)
        })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);

        if(ActorToggle){
            settoggleBtnText('Open Cast List')
        } else {
            settoggleBtnText('Close Cast List')
        }
    }


    return (
        <div>
            { /* Header */}
            <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title={`${Movie.title}`}
                overview={`${Movie.overview}`}
            />


            { /* Body */ }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>

                { /* Movie Info */}
                <MovieInfo movie={Movie} />

                <br />

                {/* Actors Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>{ toggleBtnText }</button>
                </div>

                { ActorToggle && 
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCards 
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null }
                                    castName={cast.name}
                                    character={cast.character}
                                />  
                            </React.Fragment>
                        ))}
                    </Row>
                }
                
            </div>


        </div>
    )
}

export default MovieDetail
