// Importing the necessary modules 
import { Fragment } from "react";
import steps from "@Components/Steps/Steps";
import Navbar from "@Components/Navbar/Navbar";
import Footer from "@Components/Footer/Footer";
import dashboardPreview from "@Images/image.png"; 
import darpaLogo from "@Images/darpa.jpeg"; 

// Creating the homepage component 
const Home = () => {
    // Rendering the home component 
    return(
        <Fragment> 
            <div className="min-h-screen"> 
                {/* Navbar */}
                <Navbar /> 

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-10"> 
                    {/* Hero Section */}
                    <section className="space-y-3"> 
                        <div className="flex"> 
                            <div className="mr-5"> 
                                <img src={darpaLogo} alt="darpa logo" /> 
                            </div>
                          
                            <h2 className="text-4xl md:text-[70px] md:leading-[70px] font-extrabold text-white tracking-tighter"> 
                                Threat Detection Intelligence Analysis
                            </h2>
                        </div>

                        <p className="text-xl text-left text-gray-400"> 
                            Welcome to the operational interface for our Military Satellite Image Threat Detection System. 
                            This React + Vite platform visualizes geospatial AI output, allowing command and control to monitor 
                            assets in real-time. 
                        </p>
                    </section>


                    {/* System Overview */}
                    <section className="grid gap-2 items-center"> 
                        <div className="md:col-span-3"> 
                            <h3 className="text-3xl font-semibold text-mil-blue-light"> Core Architecture </h3>
                        </div>
                        <section className="grid gap-4 items-center"> 
                            <div> 
                                <p className="text-lg text-gray-400"> 
                                    This system bridges high-altitude imagery, deep learning and vision language model inference. Our full-stack solution 
                                    utilizes a powerful Python/Flask backend running on <b> YOLOv8 </b> object detection models (trained on xView dataset). 
                                    The <b> React </b> frontend (powered by Vite and TailWindCss) renders the output via an interactive 'Satatal View', providing geospatial context 
                                    and analytics for critical decision-making.
                                </p>
                                <div className="flex gap-4"> 
                                    {["YOLOv8", "Geospatial AI", "Fullstack ML", "Flask", "ReactJS"].map(tech => (
                                        <span key={tech} className="bg-mil-dark border border-mil-border text-sm px-4 py-1.5 rounded-full text-mil-blue-light"> 
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="md:col-span-2 bg-mil-gray p-4 rounded-lg border border-mil-border shadow-xl w-[100%]">
                                <img 
                                    src={dashboardPreview} 
                                    alt="Military Satellite Threat Detection Dashboard Interface Preview" 
                                    className="rounded border border-mil-border" 
                                />
                                <p className="text-center text-xs text-gray-500 mt-3 font-mono">Figure 1. Operational Dashboard Preview (SECTOR A3)</p>
                            </div>
                        </section>
                    </section>

                    {/* User Guide */}
                    <section className="space-y-10"> 
                        <h3 className="text-3xl font-semibold text-mil-blue-light"> How to Use the System </h3>
                        <div className="grid md:grid-cols-3 gap-8"> 
                            {steps.map((step, index) => (
                                <div key={index} className="bg-mil-gray p-8 rounded-xl border border-mil-border space-y-4 hover:border-mil-blue transition-all group"> 
                                <div className="flex items-center gap-4"> 
                                    <div className="text-4xl bg-mil-dark w-14 h-14 rounded-full flex items-center justify-center border-mil-border group-hover:border-mil-blue group-hover:bg-mil-blue/10 transition-colors"> 
                                        {step.icon}
                                    </div>  
                                    <h4 className="text-xl font-bold text-white tracking-tight">{step.title}</h4>  
                                </div>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.description}
                                </p>
                                {/* Specific descriptions linked back to Figure 1  */}
                                {index === 3 && (
                                    <div className="flex gap-3 text-xs pt-2 font-semibold"> 
                                        <span className="text-mil-ship"> Ships Identified: 11 </span>
                                        <span className="text-mil-aircraft"> Aircraft: 6 </span>
                                        <span className="text-mil-building"> Buildings: 23 </span>
                                    </div>
                                )}
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Adding the footer  */}
                <Footer /> 
            </div>
        </Fragment>
    )
}

// Exporting the home component 
export default Home; 