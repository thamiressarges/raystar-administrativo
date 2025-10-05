import {Routes, Route} from 'react-router-dom';

import {SignIn} from '../SignIn';
import {ForgotPassword} from '../ForgotPassword'; 

export function AppRoutes(){
    return(
        <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/forgotpassword' element={<ForgotPassword/>} />
        </Routes>
    )
}