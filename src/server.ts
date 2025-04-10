import express from 'express'
import cors from 'cors'
import config from "./config/config";
import routes from './routes';

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes)

app.listen(config.port, () => {
  console.log(`Running on port ${config.port}`)
})