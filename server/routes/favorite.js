const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')


//=================================
//             favorite
//=================================

router.post('/favoriteNumber', (req, res) => {

    // mongoDB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId })
    .exec( (err, info) => {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, favoriteNumber: info.length })
    })

})


router.post('/favorited', (req, res) => {

    // 내가 이 영화를 favorite 리스트에 넣었는지 db에서 가져오기


    // mongoDB에서 favorite 숫자 가져오기
    Favorite.find({ "movieId": req.body.movieId,  "userFrom": req.body.userFrom })
    .exec( (err, info) => {
        if(err) return res.status(400).send(err)

        let result = false;
        if(info.length != 0 ){
            result = true
        }
        res.status(200).json({ success: true, favorited: result })
    })

})


module.exports = router;