import express from 'express' ; 
import { PORT } from './config/env.js';
//routes
import productsRouter from './routes/products.routes.js' ; 
import ordersRouter from './routes/order.router.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';

//database 
import connectToDatabase from './database/connectDatabase.js';
 
const app = express() ; 

app.use("/api/v1/products", productsRouter) ; 
app.use("/api/v1/orders", ordersRouter) ; 
app.use("/api/v1/auth", authRouter) ; 
app.use("/api/v1/users", userRouter) ; 

app.get('/', (req, res) => {
    res.send('Welcome to the backend of the website!!! ') ; 
})

app.listen(PORT, async () => {
    console.log(`The server is listening to http:localhost:${PORT} !!!`) ; 
    await connectToDatabase() ; 
})

export default app ; 
