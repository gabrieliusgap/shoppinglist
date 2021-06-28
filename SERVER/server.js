const express = require('express')
const cors = require("cors")
const app = express()

require('dotenv').config()
const mongoose = require('mongoose')
const mainRouter = require('./routes/router')
const mainPSschema = require('./schemas/productShopSchema')
app.listen(8000)
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then( () => {
        console.log('Connection was successful')
    })
    .catch(e => {
        console.log('Error while connecting to db')
    })

app.use(['/'], mainRouter)