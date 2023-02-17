import express from 'express'
import router from '@/routes'
import cors from 'cors'
import dbClient from '@/db'
import pkg from 'body-parser'
import cookieParser from 'cookie-parser'
import {vetifyToken} from '@/controllers/verifyToken'
const { json, urlencoded } = pkg
const port = 3002
const app = express()

// Use Node.js body parsing middleware
app.use(json({ limit: '50mb' }))
app.use(urlencoded({
  extended: true
}))

app.use(cookieParser());
app.use(cors())
app.use(express.static('public'))
dbClient.connect()
app.use(vetifyToken)
app.use(router)

app.listen(port, () => {
  console.log(`Server is running in http://localhost:${port}`)
})

process.on("SIGINT", () => {
  dbClient.close();
  console.log('Соединение с базой закрыто')
  process.exit();
});