// Importing the necessary modules 
import { Fragment } from "react";
import Cookies from 'js-cookie'; 
import { jwtDecode } from 'jwt-decode'; 

// Getting the user cookiei 
const userCookie = Cookies.get("x-auth-token"); 
let isLoggedIn; 

// Creating the navbar component 
const Navbar = () => {
    // Creating a function to handle the logout session 
    const handleLogout = () => {
        // Remove the user token 
        Cookies.remove('x-auth-token'); 

        // Wait for 2 seconds, and redirect the user to the home page 
        setTimeout(() => {
            // Navigating the user to the home page 
            window.location.href = "/login"; 
        }, 2000); 
    }

    // Checking the user's cookie 
    const userCookie = Cookies.get('x-auth-token'); 
    let isLoggedIn = false; 

    // if the user cookie exists 
    if (userCookie) {
        // Using try, catch block to decode the user cookie 
        try {
            // Get the decoded token 
            const decodedToken = jwtDecode(userCookie); 
            isLoggedIn = decodedToken?.isLoggedIn || false; 
        }

        // Catch the error 
        catch (error) {
            // Set the isLoggedIn as false 
            isLoggedIn = false; 
        }
    }


    // Rendering the navbar component 
    return(
        <Fragment> 
                <nav className="bg-mil-gray border-b border-mil-border sticky top-0 z-50">
                    <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <a href="/" className="flex items-center justity-center gap-3">
                            <div className="flex w-full items-center justify-between"> 
                                <span className="text-3xl">📡</span>
                                <h1 className="text-2xl font-bold text-blue-200 mx-2">Military Satellite AI System</h1>
                            </div>
                        </a>
                        <div> 
                            {isLoggedIn ? (
                                <>
                                    <a href="/dashboard" className="text-sm text-blue-200 mr-[12px]">
                                        Dashboard
                                    </a>
                                    <a href="/history" className="text-sm text-blue-200 mr-[12px]"> 
                                        History
                                    </a>
                                    <a href="/profile" className="text-sm text-blue-200 mr-[12px]"> 
                                        Profile
                                    </a>
                                    <a href="/reports" className="text-sm text-blue-200 mr-[12px]"> 
                                        Reports
                                    </a>
                                    <a href="/settings" className="text-sm text-blue-200 mr-[12px]"> 
                                        Settings
                                    </a>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-[#206feb] pt-[7px] pr-[20px] pb-[7px] pl-[20px] rounded-[4px] ml-[10px]"
                                    >
                                        Logout
                                    </button>
                                </>

                            ):(
                                <>
                                    <a href="/login" className="text-sm text-blue-200 mr-2"> Login </a>
                                    <a href="/register" className="text-sm text-blue-200 mr-2"> Register </a>
                                    <a className="text-sm text-blue-200 mr-2"> About </a>
                                    <a className="text-sm text-blue-200 mr-2"> Contact </a>
                                </>
                            )}

                        </div>
                    </nav>
                </nav>   
        </Fragment>
    )
}

// Exporting the navbar 
export default Navbar; 