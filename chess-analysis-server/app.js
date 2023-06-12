import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import { router as openingsRouter } from './routers/openingsRouter.js'
import { router as authRouter } from './routers/authRouter.js'

const PORT = 8080

dotenv.config()
const app = express()

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, //One minute
  max: 100,
})

app.use(apiLimiter)
app.use(cors())
app.use(express.json())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
app.use(cookieParser())
app.get('/', (req, res) => {
  res.send('Chess API')
})

app.use('/openings', openingsRouter)
app.use('/auth', authRouter)

try {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
  })
} catch (error) {
  console.log(error)
}
