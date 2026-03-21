// Importing the necessary modules 
import { Fragment } from 'react';
import { ShieldCheck, ShieldAlert, X } from 'lucide-react'; // Swapped for military-style icons
import { motion, AnimatePresence } from 'framer-motion';

// Creating a component for the alert box 
const AlertBox = ({ status, alertMessage, onClose }) => {
    // Logic to determine theme based on status (e.g., "Success" or "Error")
    const isError = status?.toLowerCase().includes('error') || status?.toLowerCase().includes('denied');
    const accentColor = isError ? 'text-red-500' : 'text-mil-blue';
    const borderColor = isError ? 'border-red-900/50' : 'border-mil-blue/30';
    const bgColor = isError ? 'bg-red-950/20' : 'bg-mil-blue/5';

    // Rendering the component 
    return (
        <Fragment> 
            {/* Sliding Alert Component */}
            <AnimatePresence>
                <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 20, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`fixed top-24 left-0 z-[70] flex items-center gap-4 bg-mil-gray ${bgColor} text-white p-4 rounded-md shadow-[0_0_20px_rgba(0,0,0,0.5)] border-l-4 ${isError ? 'border-l-red-600' : 'border-l-mil-blue'} border-y ${borderColor} border-r ${borderColor} w-[90%] max-w-sm font-mono`}
                >
                    {/* Status Icon */}
                    <div className={`${accentColor} p-1`}>
                        {isError ? <ShieldAlert size={28} /> : <ShieldCheck size={28} />}
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-mil-dark px-1 border border-mil-border text-gray-500 uppercase tracking-tighter">
                                System Msg
                            </span>
                            <h4 className={`font-bold text-xs uppercase tracking-widest ${accentColor}`}>
                                {status}
                            </h4>
                        </div>
                        <p className="text-[11px] text-gray-400 mt-1 leading-tight uppercase">
                            {alertMessage}
                        </p>
                    </div>

                    {/* Close Button */}
                    <button 
                        onClick={onClose} 
                        className="p-1 hover:bg-white/5 rounded border border-transparent hover:border-mil-border transition-all"
                    >
                        <X size={16} className="text-gray-500" />
                    </button>
                </motion.div>
            </AnimatePresence>
        </Fragment>
    )
}

// Exporting the alert box 
export default AlertBox;