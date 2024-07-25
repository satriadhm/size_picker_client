import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import the default CSS for react-toastify
import "./App.css";
import gambar1 from "./public/pic.jpg";

const App = () => {
  const [formData, setFormData] = useState({ name: "", size: "" });
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Set loading state to true

    try {
      console.log("Sending data to backend...");
      const response = await axios.post("https://size-picker-server.vercel.app/api/export", formData);
      console.log("Data sent to backend:", response.data);
      toast.success("Data sent successfully!"); // Show success notification
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error sending data. Please try again."); // Show error notification
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex flex-col items-center p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Size Chart</h1>
      <div className="mb-6">
        <img
          src={gambar1}
          alt="Size Chart"
          className="w-full h-auto max-w-lg"
        />
      </div>
      <div className="w-full space-y-4">
        <div className="flex flex-col items-center gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full max-w-xs text-center"
          />
          <select
            name="size"
            value={formData.size}
            onChange={handleInputChange}
            className="border p-2 rounded-md w-full max-w-xs text-center"
          >
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="2XL">2XL</option>
            <option value="3XL">3XL</option>
            <option value="4XL">4XL</option>
            <option value="5XL">5XL</option>
          </select>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Submitting..." : "Submit Data"}
          </button>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to render notifications */}
    </div>
  );
};

export default App;
