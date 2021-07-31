const mongoose = require('mongoose');


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
// 스키마를 모델로 감싸준다
const User = mongoose.model('User', userSchema)

// 다른 곳에서 사용할 수 있게 export를 해준다, 마치 java의 return처럼
module.exports = { User }
