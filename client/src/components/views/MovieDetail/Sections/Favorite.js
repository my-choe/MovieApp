import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const moveTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    useEffect(() => {

        let variables = {
            userFrom,
            movieId
        }


       Axios.post('/api/favorite/favoriteNumber', variables)
       .then(response => {
           if(response.data.success){
            setFavoriteNumber(response.data.FavoriteNumber)
           }else {
               alert('favorite 숫자 정보 로딩 실패!')
           }
       })


       Axios.post('/api/favorite/favorited', variables)
       .then(response => {
           if(response.data.success){
                setFavorited(response.data.favorited)
           }else {
               alert('favorite 정보 로딩 실패!')
           }
       })




    }, [])





    return (
        <div>
            <button>{Favorited ? "Not Favorite" : "Add to Favorite" } &emsp; {FavoriteNumber}</button>
        </div>
    )
}

export default Favorite
