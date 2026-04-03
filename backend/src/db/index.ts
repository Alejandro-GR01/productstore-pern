import {drizzle} from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema.ts'
import { ENV } from '../config/env.ts'


if(!ENV.DATABASE_URL){
    throw new Error("DATABASE_URL is not set in enviroment variable");
}


// inicializar pool conection con Postgres 
const pool = new Pool({connectionString: ENV.DATABASE_URL})


// mostrar la primera coneccion
pool.on("connect", ()=> {
    console.log('Database connected successfully')
})

// mostrar si ocurre un error de cconeccion
pool.on("error", (err)=> {
    console.log('Database connection error', err)
})

export const db = drizzle({client: pool, schema})