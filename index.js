const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()

const cors = require('express')
const port = process.env.PORT
const logger = require('morgan')


//define routes
const routes = require('./routes/userRoutes')


const Connection = require('./config/connection')



//cors policy
app.use(cors())

//JSON
app.use(express.json())
 
//Router define app
app.use('/',routes)

app.listen(port,()=>{
    console.log(`Server listning at http://localhost:${port}`)
})