const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')
const { User } = require('./models/User');
const { auth } = require('./middleware/auth');

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

app.get('/api/hello', (req, res) => {

    res.send("안녕하세요")
})

// 회원가입
app.post('/api/users/register', (req, res) => {
    console.log('호출 완료')
    console.log(req.body)
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
app.post('/api/users/login', (req, res) => {
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

// Role : 1 == Admin / Role : 2 == 특정부서 Admin / Role : 0 == 일반 유저
app.get('/api/users/auth', auth, (req, res) => {
    // 여기까지 미들웨어를 통과해왔으면 Authentication True
    res.status(200).json({
        _id : req.user._id,
        isAdmin : req.user.role !== 0,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id : req.user._id}, {token : ""}, (err, user) => {
        if(err) return res.json({ success : false, err });
        return res.status(200).send({
            success : true
        })
    })
})

app.listen(port, () => console.log(`Example App listening on port ${port}!`))
