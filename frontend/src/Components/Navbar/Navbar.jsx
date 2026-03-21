// Importing the necessary modules 
import { Fragment } from "react";

// Creating the navbar component 
const Navbar = () => {
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
                            <a href="/login" className="text-sm text-blue-200 mr-2"> Login </a>
                            <a href="/register" className="text-sm text-blue-200 mr-2"> Register </a>
                            <a className="text-sm text-blue-200 mr-2"> About </a>
                            <a className="text-sm text-blue-200 mr-2"> Contact </a>
                        </div>
                    </nav>
                </nav>   
        </Fragment>
    )
}

// Exporting the navbar 
export default Navbar; 