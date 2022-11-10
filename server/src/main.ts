import cors from 'cors'
import express from 'express'
import prisma from './prisma'
import appRouter from './routes'
import { port } from './util/consts'

const app = express()

app.use(cors({ origin: '*' }))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use((req, _, next) => {
  console.log(req.method, req.url)
  console.log(req.body)
  next()
})

app.use(appRouter)

prisma
  .$connect()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  })
  .catch(error => {
    console.log('Error connecting to database')
    console.error(error)
  })
