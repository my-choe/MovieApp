import Axios from 'axios';
import React, {useEffect, useState } from 'react'
import './favorite.css';
import { Popover, Button } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'  

function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie', { userFrom: localStorage.getItem('userId') })
        .then(response => {
            console.log(response)
            if(response.data.success){
                 setFavorites(response.data.favorites)
            }else{
                alert('favorite 영화 정보 가져오기 실패!')
            }
        })
    }

    const onClickDelete = (movieId, userFrom) => {
        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
        .then(response => {
            if(response.data.success) {
                fetchFavoredMovie()
            } else {
                alert('favorite 삭제 실패!')
            }
        })
    }

    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ? 
                    <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> : "no image"
                }
            </div>
        )
        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td style={{width:'5%'}}>
                    {favorite.moviePost ? 
                        <img src={`${IMAGE_BASE_URL}w200${favorite.moviePost}`} /> : "no image"
                    }
                </td>
            </Popover>
            <td style={{fontSize:'20pt', fontWeight:'800'}}>{favorite.movieTitle}</td>
            <td>{favorite.movieRunTime}분</td>
            <td style={{width:'12%'}}><Button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</Button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2> Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Poster</th>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    { renderCards }
                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
