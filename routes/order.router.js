import {Router} from 'express' ; 
import {createOrder, getAllOrders, getOrder, updateOrder, deleteOrder} from '../controllers/order.controller.js' ; 

const ordersRouter = Router() ; 

ordersRouter.post('/', createOrder) ; 

ordersRouter.get('/', getAllOrders) ; 

ordersRouter.get('/:id', getOrder); 

ordersRouter.put('/:id', updateOrder) ; 

ordersRouter.delete('/:id', deleteOrder) ; 

export default ordersRouter ; 