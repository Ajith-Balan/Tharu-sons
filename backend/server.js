import express from 'express'
import dotenv from 'dotenv'
import connection from './connection.js'
import auth from './router/auth.js'
import categoryRoutes from './router/categoryRoutes.js'
import productRoutes from './router/productRoutes.js'
import catRoutes from './router/catRoutes.js'
import cors from 'cors'


dotenv.config()
connection()
const app =express()
app.use(cors())
app.use(express.json({ limit: "50mb" }));


app.use('/api/v1/auth',auth)
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/cat',catRoutes);

// app.get('/',(req,res)=>{
//     res.send({message:'welcome to ecom app'})
// })
app.use('/api/v1/product', productRoutes)



const PORT = process.env.PORT || 8080




app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
    
})
