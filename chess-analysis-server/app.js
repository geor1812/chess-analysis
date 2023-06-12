import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'

import { router as openingsRouter } from './routers/openingsRouter.js'

const PORT = 8080

dotenv.config()
const app = express()

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

try {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
  })
} catch (error) {
  console.log(error)
}
