require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require('mongoose')
const workoutRoute = require('./routes/workoutRoute')
const userRoutes = require('./routes/user')
const PORT = process.env.PORT || 4000

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// routes
app.use('/api/workout',workoutRoute)
app.use('/api/user',userRoutes)

// Connect to DB
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    //Listen
app.listen(4000,() =>
{
    console.log(`connected to Db & server is running on ${PORT}`)
})
})
.catch((error) =>
{
    console.log(error.message)
})



