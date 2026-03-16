// Creating the steps object 
const steps = [
   {
      title: "1. Data Input",
      description: "Navigate to the 'Data Input' section on the control panel. Users can either 'Upload Satellite Image' (accepting formats like JPEG, PNG, or TIFF) or 'Connect Live Feed' for real-time monitoring streams.",
      icon: "📥",
    },
    {
      title: "2. Model Selection",
      description: "Choose your preferred object detection model. The platform defaults to the highly efficient YOLOv8, but users can switch to Faster R-CNN or other custom models depending on the required accuracy/speed trade-off.",
      icon: "🧠",
    },
    {
      title: "3. System Analysis",
      description: "Click the analyze button (automatically triggers on upload). The backend Python API receives the image, runs the selected model, and generates a JSON response detailing object classes, confidence scores, and bounding box coordinates.",
      icon: "⚙️",
    },
    {
      title: "4. Detections Panel",
      description: "The main 'Satatal View' renders the image with overlayed bounding boxes (yellow for Ships, cyan for Aircraft, magenta for Buildings). Real-time statistics are displayed in the 'Detection Analytics' panel, including a 'Detected Objects (Live Count)'.",
      icon: "📊",
    },
    {
      title: "5. Advanced Features & Review",
      description: "Utilize advanced features like 'Change Detection' (comparing historical data to new images) or review the 'Threat Assessment Score' (ELEVATED in the example). All new detections populate the 'Recent Detections Feed' for immediate logging.",
      icon: "🔭",
    }, 
]; 

// Exporting the steps data 
export default steps; 