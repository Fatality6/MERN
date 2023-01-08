import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from './routes/auth.js'

const app = express()
mongoose.set('strictQuery', false)
dotenv.config()

// Constants

const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME 

// MiddleWare

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xmqljvd.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )
        app.listen(`${PORT}`, ()=>console.log(`Server has been started on port:${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()