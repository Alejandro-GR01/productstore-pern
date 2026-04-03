import express from 'express'
import { ENV } from './config/env.ts';
import cors from 'cors'
import { corsConfig } from './config/cors.ts';

const app = express();
app.use(express.json()); //permite el uso de los json
app.use(express.urlencoded({extended: true})) //parseado de data 
app.use(cors(corsConfig))
 
app.get('/', (req, res)=> {
    res.json({
        message: 'Welcome to Productify API - Powered by PostgreSQL , Drizzle ORM % Clerk Auth',
        endpoints: {
            user: 'api/users',
            products: '/api/products',
            comments: 'api/comments',
        }
    })
})

 app.listen(ENV.PORT, ()=> console.log(`Sever running on PORT:${ENV.PORT}`))