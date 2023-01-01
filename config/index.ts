import * as dotenv from 'dotenv'
import path from 'path'

const NODE_ENV = process.env.NODE_ENV || 'local'
const envPath = path.join(__dirname, '../..', `.env.${NODE_ENV}`)
dotenv.config({ path: envPath })

const config = {
  NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CLD_NAME: process.env.CLD_NAME,
  CLD_API_KEY: process.env.CLD_API_KEY,
  CLD_SECRET_KEY: process.env.CLD_SECRET_KEY
}

export default config;