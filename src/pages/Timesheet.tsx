import React, { useState } from "react";
import axios from "axios";

// Define the types for the form data
interface TimesheetFormData {
  displayName: string;
  partnerDisplayName: string;
  startTime: string;
  endTime: string;
  truckNumber: string;
  hasLunch: boolean;
  numOfBreaks: number;
  remarks: string;
}

const Timesheet: React.FC = () => {
  // Initialize the form data with the appropriate types
  const [formData, setFormData] = useState<TimesheetFormData>({
    displayName: "",
    partnerDisplayName: "",
    startTime: "",
    endTime: "",
    truckNumber: "",
    hasLunch: false,
    numOfBreaks: 0,
    remarks: "",
  });

  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    console.log(formData);
    try {
      // Send form data to the C# backend
      // const response = await axios.post(
      //   "https://topmedbackend-gyg4d0f5cffrcaaf.canadacentral-01.azurewebsites.net/api/sendemail",
      //   formData
      // );
      setLoading(false);
      setMessage("Timesheet submitted successfully!");
    } catch (err) {
      setLoading(false);
      setError("Failed to submit timesheet. Please try again.");
    }
  };

  return (
    <div className="timesheet-form-container">
      <h2>Input Timesheet</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Display Name:</label>
          <input
            type="text"
            name="displayName"
            value={formData.displayName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Partner Display Name:</label>
          <input
            type="text"
            name="partnerDisplayName"
            value={formData.partnerDisplayName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Truck Number:</label>
          <input
            type="text"
            name="truckNumber"
            value={formData.truckNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Had Lunch?</label>
          <input
            type="checkbox"
            name="hasLunch"
            checked={formData.hasLunch}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Number of Breaks:</label>
          <input
            type="number"
            name="numOfBreaks"
            value={formData.numOfBreaks}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Remarks:</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Timesheet"}
        </button>
      </form>
    </div>
  );
};

export default Timesheet;
