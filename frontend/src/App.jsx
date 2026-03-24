// Importing the necessary modules 
import Cookies from "js-cookie"; 
import { jwtDecode } from 'jwt-decode'; 
import { Component, Fragment } from 'react'; 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Importing the pages 
import Home from './Pages/Public/Home/Home';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import DashboardHome from './Pages/Dashboard/DashboardHome'; 


// Creating the App component 
class App extends Component {
    // Rendering the component 
    render() {
        // Getting the user cookie 
        const userCookie = Cookies.get('x-auth-token'); 
        let isLoggedIn = false; 

        // Checking if the user's cookie is present 
        if (userCookie) {
            // Using try, catch block to decode the user's cookie 
            try {
                // Decode the user cookie 
                const decodedToken = jwtDecode(userCookie); 
                isLoggedIn = decodedToken?.isLoggedIn || false; 
            }
            // Catch the error 
            catch (error) {
                // Setting the isLoggedIn as false 
                isLoggedIn = false; 
            }
        }

        // Returning the jsx component 
        return(
            <BrowserRouter>
                <Routes> 
                    {/* Adding the public routes */}
                    <Route path="/" element={<Home /> } /> 

                    {/* Adding the Auth routes */}
                    <Route 
                        path="/login" 
                        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login /> } 
                    /> 
                    <Route 
                        path="/register" 
                        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Register /> } 
                    /> 

                    {/* Adding the protected routes  */}
                    <Route 
                        path="/dashboard"
                        element={isLoggedIn ? <DashboardHome /> : <Navigate to="/login" replace /> }
                    />
                </Routes> 
            </BrowserRouter>
        )
    }
}

// Exporting the component 
export default App; 