// Importing the necessary modules 
import darpaLogo from "@Images/darpa.jpeg"; 
import { Fragment, useState } from "react";
import Navbar from "@Components/Navbar/Navbar";
import Footer from "@Components/Footer/Footer";
import AlertBox from "@Components/AlertBox/AlertBox";

// Creating the register component 
const Register = () => {
    // State for the alert visibility and messaging
    const [showAlert, setShowAlert] = useState(false);
    const [status, setStatus] = useState(null); 
    const [alertMessage, setAlertMessage] = useState(null); 

    // Setting the state for the input form 
    const [fullname, setFullname] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [clearanceCode, setClearanceCode] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [confirmPassword, setConfirmPassword] = useState(""); 

    // Creating a function for closing the alert box 
    const closeAlert = () => {
        // Setting the necessary states to null and false 
        setShowAlert(false); 
        setStatus(null); 
        setAlertMessage(null); 
    }

    // Creating a function for handling the submit button 
    const handleRegister = async (event) => {
        // Prevent default submission 
        event.preventDefault();

        // Validation check for capital letters 
        const hasCapital = /[A-Z]/.test(password); 

        // Checking the fullname 
        if (fullname === "") {
            // Showing the alert box 
            setAlertMessage("Fullname is required."); 
            setStatus("INFO"); 
            setShowAlert(true); 
        }

        // Checking the email 
        else if (email === "" || !email.includes("@")) {
            // Showing the alert box 
            setAlertMessage("Email address is required."); 
            setStatus("INFO"); 
            setShowAlert(true); 
        }

        // Checking the clearance code 
        else if (clearanceCode === "") {
            // Showing the alert box 
            setAlertMessage("Clearance code is required."); 
            setStatus("INFO"); 
            setShowAlert(true); 
        }

        // Checking the password 
        else if (password.trim() === "" || password.length < 3) {
            // Showing the alert box 
            setAlertMessage("Password field cannot be empty \n Credentials length must be at least more than 3 characters long."); 
            setStatus("INFO"); 
            setShowAlert(true); 

        }

        // The password must contain one upper case letter 
        else if (!hasCapital) {
            // Execute the block of code if the password does not contain uppercase letters 
            setAlertMessage("Password must contain at least one uppercase letter."); 
            setStatus("INFO"); 
            setShowAlert(true); 
        }

                // Checking the confirm password 
        else if (confirmPassword.trim() === "") {
            // Showing the alert box 
            setAlertMessage("Please retype your password to confirm it."); 
            setStatus("INFO"); 
            setShowAlert(true); 
        }

        // Checking if the password match 
        else if (password.trim() !== confirmPassword.trim()) {
            // Showing the alert box 
            setAlertMessage("Passwords do not match."); 
            setStatus("INFO"); 
            setShowAlert(true); 
        }

        // Else if all validations pass, execute the block of code below 
        else {
            // Getting the registration data 
            const registrationData = JSON.stringify({
                fullname: fullname.trim(), 
                email: email.trim(), 
                clearanceCode: clearanceCode.trim(), 
                password: password.trim() 
            }); 

            // Setting the backend server url 
            const serverUrl = `${import.meta.env.VITE_SERVER_URL}/register`; 

            // Using try catch block to send the request to the backend server 
            try {
                // Making the request to the register route 
                const response = await fetch(serverUrl, {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json'}, 
                    body: registrationData
                }); 

                // if there was no response from the server 
                if (!response.ok) {
                    // Handle the server side error 
                    const errorData = await response.json(); 

                    // Display the error message 
                    setAlertMessage(errorData.message || "Registration failed."); 
                    setStatus("ERROR"); 
                    setShowAlert(true); 

                    // Auto hide the alert after 5 seconds 
                    setTimeout(() => setShowAlert(false), 5000); 
                    return; 
                }

                // if the server returned a response, get the response 
                // and convert it into a json object 
                const responseData = await response.json(); 

                // if the user was registered, execute this block of code 
                if (responseData.status === "success") {
                    // Display the status message 
                    setAlertMessage(responseData.message); 
                    setStatus("SUCCESS"); 
                    setShowAlert(true); 

                    // Auto hide, and navigate the user to the login page 
                    setTimeout(() => {
                        // Hide the message 
                        setShowAlert(false); 

                        // Navigate the user to the login page 
                        window.location.href = "/login"; 
                    }, 6000)
                }

                // Else if the response data was an error 
                else {
                    // Display the status message 
                    setAlertMessage(responseData.message); 
                    setStatus("ERROR"); 
                    setShowAlert(true); 

                    // Auto hide the error after 7 minutes 
                    setTimeout(() => setShowAlert(false), 7000); 
                    return; 
                }
            }

            // Catch the error 
            catch (error) {
                // Log the error to the console 
                console.log("ERROR: ", error.message); 

                // Display the error message 
                setAlertMessage("Error connecting to the server."); 
                setStatus("ERROR"); 
                setShowAlert(true); 

                // Auto hide the error after 7 mins 
                setTimeout(() => setShowAlert(false), 7000); 
                return; 
            }
        }
    }

    // Rendering the component 
    return(
        <Fragment> 
            {/* Adding the navbar */}
            <Navbar />

            {/* Adding the alert display */}
            {/* Sliding Alert Component for feedback */}
            {showAlert && (
                <AlertBox status={status} alertMessage={alertMessage} onClose={closeAlert} /> 
            )}

            {/* Adding the main div */}
            <main className="flex-grow flex items-center justify-center px-6 py-12 mb-[60px]">
                <section className="w-full max-w-md bg-mil-gray border border-mil-border rounded-xl shadow-2xl p-8 space-y-8">
                    {/* Adding the Header Section */}
                    <div className="text-center space-y-4">
                        <div className="flex justify-center mb-4"> 
                            <img src={darpaLogo} alt="darpa logo" className="h-12 w-auto grayscale contrast-125 opacity-80" /> 
                        </div>
                        <h2 className="text-sm text-gray-500 font-mono uppercase tracking-widest"> 
                            Personnel Registration 
                        </h2>
                        <p className="text-sm text-gray-500 font-mono uppercase tracking-widest"> 
                            Secure Access Level: Sector A3 
                        </p>
                    </div>

                    {/* Registration Form */}
                    <form className="space-y-6">
                        <div className="space-y-4"> 
                            {/* Full Name  */}
                            <div> 
                                <label className="block text-xs font-semibold text-mil-blue-light uppercase mb-1"> Full Name </label>
                                <input 
                                    type="text"
                                    name="fullname"
                                    placeholder="E.g. John Doe"
                                    className="w-full bg-mil-dark border border-mil-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-mil-blue transition-colors placeholder:text-gray-700 font-mono"
                                    onChange={(event) => {
                                        // Closing the alert 
                                        closeAlert(); 

                                        // Setting the fullname 
                                        setFullname(event.target.value); 
                                    }}
                                /> 
                            </div>
                            {/* Email */}
                            <div> 
                                <label className="block text-xs font-semibold text-mil-blue-light uppercase mb-1"> Email Address </label>
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder="operator@gov.mil"
                                    className="w-full bg-mil-dark border border-mil-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-mil-blue transition-colors placeholder:text-gray-700 font-mono"
                                    onChange={(event) => {
                                        // Closing the alert 
                                        closeAlert(); 

                                        // Setting the email value 
                                        setEmail(event.target.value) 
                                    }}
                                /> 
                            </div>

                            {/* Clearance Access Code */}
                            <div> 
                                <label className="block text-xs font-semibold text-mil-blue-light uppercase mb-1"> Clearance Access Code </label>
                                <input 
                                    type="password" 
                                    name="accesscode" 
                                    placeholder="Enter your clearance code"
                                    className="w-full bg-mil-dark border border-mil-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-mil-blue transition-colors placeholder:text-gray-700 font-mono"
                                    onChange={(event) => {
                                        // Closing the alert 
                                        closeAlert(); 

                                        // Setting the clearance code 
                                        setClearanceCode(event.target.value); 
                                    }}
                                /> 
                            </div>

                            {/* Password */}
                            <div> 
                                <label className="block text-xs font-semibold text-mil-blue-light uppercase mb-1">Password</label>
                                <p className="text-[12px] mt-[10px] mr-[34px] mb-[12px] ml-[1px] text-[#bfdbfe70]"> Password must contain a capital letter, and 
                                    must be at least more than 3 characters long.</p>
                                <input 
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="w-full bg-mil-dark border border-mil-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-mil-blue transition-colors placeholder:text-gray-700"
                                    onChange={(event) => {
                                        // Closing the alert 
                                        closeAlert(); 

                                        // Setting the clearance code 
                                        setPassword(event.target.value)
                                    }}
                                /> 
                            </div>

                            {/* Confirm your password */}
                            <div>
                                <label className="block text-xs font-semibold text-mil-blue-light uppercase mb-1">Confirm Password</label>
                                <input 
                                    type="password" 
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    className="w-full bg-mil-dark border border-mil-border rounded-md px-4 py-3 text-white focus:outline-none focus:border-mil-blue transition-colors placeholder:text-gray-700"
                                    onChange={(event) => {
                                        // Closing the alert  
                                        closeAlert(); 

                                        // Setting the confirm password 
                                        setConfirmPassword(event.target.value); 
                                    }}
                                />
                            </div>
                        </div> 

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            className="w-full bg-mil-blue hover:bg-mil-blue/80 text-white py-3 px-4 rounded-md transition-all tracking-widest shadow-lg shadow-mil-blue/20"
                            onClick={handleRegister}
                        > 
                            Autorize Registration 
                        </button>
                    </form>

                    {/* Navigations Div */}
                    <div className="text-center pt-4 border-t border-mil-border"> 
                        <p className="text-sm text-gray-400"> 
                            Already have credentials? {" "}
                            <a href="/login" className="text-mil-blue-light hover:underline font-semibold"> 
                                Login
                            </a>
                        </p>
                    </div>
                
                </section> 
            </main>
            
            {/* Adding the footer  */}
            <Footer /> 
        </Fragment>
    )
}

// Exporting the register component 
export default Register; 