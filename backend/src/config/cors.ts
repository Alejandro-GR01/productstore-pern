import {CorsOptions}  from 'cors'
import { ENV } from './env.ts'

export const  corsConfig: CorsOptions =  {
    origin: function(origin, callback){
        const whiteList = [ENV.FRONTEND_URL]

        if(whiteList.includes(origin)){
            callback(null, true)
        }else {
            callback(new Error(`CORS error from the origin ${origin}`))
        }
    }
}