const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://david:david123@nodejs-restapi.xprbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    // 에러 뜸, 적어야됨
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex :true, useFindAndModify : false
}).then(() => console.log(`MongoDB Connected...`))
  .catch(err => console.log(err))



app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`Example App listening on port ${port}!`))
