const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key')

// application/x-www-form-url-urlencoded -> 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

// application/json -> 분석해서 가져옴
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    // 에러 뜸, 적어야됨
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex :true, useFindAndModify : false
}).then(() => console.log(`MongoDB Connected...`))
  .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World.....'))

// 회원가입
app.post('/register', (req, res) => {

    const user = new User(req.body)

    

    user.save((err, userInfo) => {
    // userInfo 적어줘야 에러 안 감
        if(err) return res.json({ success: false, err})
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => console.log(`Example App listening on port ${port}!`))
