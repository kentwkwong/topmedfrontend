import React, { useState } from "react";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// Define the types for the form data
interface TimesheetFormData {
  displayName: string;
  partnerName: string;
  workFrom: string;
  timeTest: string;
  workTo: string;
  truckNum: string;
  hasLunch: boolean;
  breaksCount: number;
  remarks: string;
}

const Timesheet: React.FC = () => {
  // Initialize the form data with the appropriate types
  const [formData, setFormData] = useState<TimesheetFormData>({
    displayName: "",
    partnerName: "",
    workFrom: "",
    timeTest: "",
    workTo: "",
    truckNum: "",
    hasLunch: false,
    breaksCount: 0,
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
      const response = await axios.post(
        // "https://topmedbackend-gyg4d0f5cffrcaaf.canadacentral-01.azurewebsites.net/api/sendemail",
        "https://topmedpythonapi.vercel.app/sendtimesheetemail",
        formData
      );
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
          <label>Partner Name:</label>
          <input
            type="text"
            name="partnerName"
            value={formData.partnerName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Work From:</label>
          <input
            type="datetime-local"
            name="workFrom"
            value={formData.workFrom}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker label="Work From" name="timeTest" />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="form-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker"]}>
              <DateTimePicker label="Work To" name="timeTest" />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="form-group">
          <label>Work To:</label>
          <input
            type="datetime-local"
            name="workTo"
            value={formData.workTo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Truck Num:</label>
          <input
            type="text"
            name="truckNum"
            value={formData.truckNum}
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
            name="breaksCount"
            value={formData.breaksCount}
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
