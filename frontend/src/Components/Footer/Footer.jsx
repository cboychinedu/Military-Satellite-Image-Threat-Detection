// Importing the necessary modules 
import { Fragment } from "react";

// Creating the footer component
const Footer = () => {
    // Rendering the footer 
    return(
        <Fragment> 
                <footer className="border-t border-mil-border bg-mil-gray">
                    <div className="max-w-7xl mx-auto px-6 py-10 text-center text-gray-600 space-y-3">
                    <p className="font-mono text-sm">SECURITY CLASSIFICATION: CONFIDENTIAL</p>
                    <p>&copy; 2026 DEFENSE ADVANCED RESEARCH PROJECT AGENCY (<b> DARPA </b>) </p>
                    </div>
                </footer> 
        </Fragment>
    )
}

// Exporting the footer 
export default Footer; 