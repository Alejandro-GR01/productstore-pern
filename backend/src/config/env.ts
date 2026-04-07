import dotenv from 'dotenv'


dotenv.config({ quiet: true })


export const ENV = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BYCRYPT_SALT: process.env.BYCRYPT_SALT,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    JWT_SECRET: process.env.JWT_SECRET
}