const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
	name:{
		type : String,
		maxlength: 50
	},
	email:{
		type : String,
		trim : true,
		unique : 1
	},
	lastname: {
		type : String,
		maxlength : 50
	},
	password:{
		type : String,
		minLength: 5
	},
	role : {
		type : Number,
		default : 0
	},
	image : String,
	token : {
		type : String
	},
	tokenExp : {
		type : Number
	}
})

userSchema.pre('save', function (next){
	var user = this;

	if(user.isModified('password')){
		// 비밀번호를 암호화 시킨다.
		bcrypt.genSalt(saltRounds, function(err, salt){
			if(err) return next(err)
	
			bcrypt.hash(user.password, salt, function(err, hash){
				if(err) return next(err)
				// 암호화 성공했을 때 hash로 교체해준다.
				user.password = hash
				next()
			})
		})
	}else{
		next()
	}
})

userSchema.methods.comparePassword = function (plainPassword, cb){
	// plainPassword
	bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
		if(err) return cb(err)
		cb(null, isMatch)
	})
}

userSchema.methods.generateToken = function (cb) {
	var user = this;
	console.log('user._id', user._id)
	
	// jsonWebToken을 이용하여 Token 생성
	user.token = jwt.sign(user._id.toHexString(), 'secretToken');
	user.save(function (err, user) {
		if(err) return cb(err)
		cb(null, user)
	})
}

userSchema.statics.findByToken = function (token, cb) {
	var user = this;

	// 토큰을 decode 한다.
	jwt.verify(token, 'secretToken', function (err, decoded){
		// 유저 아이디를 이용해서 유저를 찾음 => client == DB 일치?

		user.findOne({"_id":decoded, "token": token}, function (err, user) {
			if(err) return cb(err);
			cb(null, user)
		})
	})

}

// 스키마를 모델로 감싸준다
const User = mongoose.model('User', userSchema)

// 다른 곳에서 사용할 수 있게 export를 해준다, 마치 java의 return처럼
module.exports = { User }
