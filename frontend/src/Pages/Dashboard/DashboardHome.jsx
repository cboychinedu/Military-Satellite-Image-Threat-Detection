// Importing the necessary modules 
import Navbar from "@Components/Navbar/Navbar"; 
import Footer from "@Components/Footer/Footer"; 
import React, { Fragment } from 'react'

const DashboardHome = () => {
    return (
        <Fragment> 
            {/* Adding the Navbar */}
            <Navbar />

            {/*Adding the main div  */}
            <main className="h-[100vh] bg-[#12121e]"> 
                <div className="px-[30px] py-[30px]"> Dashboard Home </div>
            </main>

            
            {/* Adding the footer  */}
            <Footer /> 
        </Fragment>
    )
}

// Exporting the dashboard 
export default DashboardHome; 