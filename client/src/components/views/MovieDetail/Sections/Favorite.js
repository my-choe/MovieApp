import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {

       Axios.post('/api/favorite/favoriteNumber', variables)
       .then(response => {
           if(response.data.success){
            setFavoriteNumber(response.data.favoriteNumber)
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


    const onClickFavorite = () => {
        if(Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber - 1);
                    setFavorited(!Favorited);
                }else {
                    alert('favorite 삭제 실패!')
                }
            })
        } else {
            Axios.post('/api/favorite/AddToFavorite', variables)
            .then(response => {
                if(response.data.success){
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited);
                }else {
                    alert('favorite 추가 실패!')
                }
            })
        }
    }





    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite" } &emsp; {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
