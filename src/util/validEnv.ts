import { cleanEnv, port, str } from 'envalid'

export default cleanEnv(process.env, {
  MONGO_CONNECTION_STRING: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  NODE_ENV: str(),
  NEXT_PUBLIC_JWT_KEY: str()
})
