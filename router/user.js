const express = require('express')
const router = express.Router()
const db = require('../database')

// get user
router.get('/', async (req, res) => {

    try{
        const user = await db.promise().query("select*from users")

        res.status(200).json({
            msg : "get users",
            userInfo : user
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

// register user
router.post('/', (req, res) => {

    const { nickname, password } = req.body

    // 먼저 if문을 통해서 nickname&& password 여부 확인 후 예외처리 진행
    if(nickname && password){

        try{
            db.promise().query(`insert into users (nickname, password) values ('${nickname}', '${password}');`)

            res.status(200).json({
                msg : "success signup"
            })
        }
        catch(err){
            res.status(500).json({
                msg : err.message
            })
        }
    }
})

// update user 
router.patch('/:userId', async (req, res) => {

    const id = req.params.userId

    const nickname = req.body

    const sql = "update users set nickname = ? where id = ?"

    try{

        const user = db.promise().query(sql, [nickname, id])

        res.status(200).json({
            msg : "update user",
            userInfo : user
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

// delete user 
router.delete('/', async (req, res) => {

    try{
        db.promise().query("delete from users")

        res.status(200).json({
            msg : "delete users"
        })
    }
    catch(err){
        res.status(500).json({
            msg : err.message
        })
    }
})

module.exports = router