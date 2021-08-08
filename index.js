const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./models/User");

const config = require('./config/key')

// application/x-www-form-url-urlencoded -> 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));

// application/json -> 분석해서 가져옴
app.use(bodyParser.json());

// 쿠키 파서 사용
app.use(cookieParser());

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

// 로그인
app.post('/login', (req, res) => {
 // 요청된 이메일을 DB에서 찾음
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) {
                return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
            }
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                // 토큰을 저장한다, 로컬 스토리지에
                res.cookie("x_auth",user.token)
                   .status(200)
                   .json({loginSuccess: true, userId: user._id});
            })
        })
    })
})

app.listen(port, () => console.log(`Example App listening on port ${port}!`))
