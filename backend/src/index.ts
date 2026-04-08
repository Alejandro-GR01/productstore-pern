import express from 'express'
import { ENV } from './config/env.ts';
import cors from 'cors'
import { corsConfig } from './config/cors.ts';

import userRoutes from './routes/userRoutes.ts';
import authRoutes from './routes/authRoutes.ts';
import productRoutes from './routes/productRoutes.ts'
import commentRoutes from './routes/commentRoutes.ts'

const app = express();

app.use(cors(corsConfig))
app.use(express.json()); //permite el uso de los json
app.use(express.urlencoded({extended: true})) //parseado de data 
 
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

app.use('/auth', authRoutes)

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/comments', commentRoutes)

 app.listen(ENV.PORT, ()=> console.log(`Sever running on PORT:${ENV.PORT}`))