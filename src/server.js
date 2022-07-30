import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(router)

app.listen(3333, '192.168.15.12', () => console.log("Server listen on 3030"))


