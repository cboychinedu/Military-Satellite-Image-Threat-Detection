// Importing the necessary modules 
import { Component, Fragment } from 'react'; 
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Importing the pages 
/**
 * This section is for the route pages imported from the 
 * Pages route folder 
 */
import Home from './Pages/Public/Home/Home';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';


// Creating the App component 
class App extends Component {
    // Rendering the component 
    render() {
        // Returning the jsx component 
        return(
            <Fragment> 
                <BrowserRouter>
                    <Routes> 
                        {/* Adding the routes */}
                        <Route path="/" element={<Home /> } /> 
                        <Route path="/login" element={<Login /> } /> 
                        <Route path="/register" element={<Register /> } /> 
                    </Routes> 
                </BrowserRouter>
            </Fragment>
        )
    }
}

// Exporting the component 
export default App; 