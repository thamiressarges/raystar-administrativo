import {Routes, Route} from 'react-router-dom';

import {SignIn} from '../SignIn';
import {ForgotPassword} from '../ForgotPassword'; 
import {Order} from '../Order'; 
import {Clients} from '../Clients'; 
import {Category} from '../Category';
import { Product } from '../Products';
import {Settings} from '../Settings';
import { OrderDetails } from '../OrderDetails';
 

export function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/forgotpassword' element={<ForgotPassword/>} />
            <Route path='/order' element={<Order/>} />
            <Route path='/clients' element={<Clients/>} />
            <Route path='/category' element={<Category/>} />
            <Route path='/products' element={<Product/>} />
            <Route path='/settings' element={<Settings/>} />
            <Route path='/orderDetails' element={<OrderDetails/>}/>
        </Routes>
    )
}