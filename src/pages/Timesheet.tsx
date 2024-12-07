// Timesheet.tsx
import React, { useState } from "react";
import axios from "axios";
import {
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Box,
  Paper,
  SelectChangeEvent,
  FormControl,
} from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "./Timesheet.css"; // Import the external CSS file
import { assert } from "console";

// TypeScript interface for form data
interface TimesheetData {
  displayName: string;
  partnerName: string;
  truckNum: string;
  workFrom: string;
  workTo: string;
  breaksCount: number;
  hasLunch: boolean;
  remarks: string;
  dtp: string;
}

const TimesheetForm: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const names: string[] = ["Kent"];

  const [formData, setFormData] = useState<TimesheetData>({
    displayName: names[0],
    partnerName: "",
    truckNum: "",
    workFrom: "",
    workTo: "",
    breaksCount: 0,
    hasLunch: false,
    remarks: "",
    dtp: "",
  });

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleWorkFromChange = (newValue: Dayjs | null) => {
    setFormData({
      ...formData,
      workFrom: newValue ? newValue.format("YYYY-MM-DDTHH:mm") : "",
    });
  };
  const handleWorkToChange = (newValue: Dayjs | null) => {
    setFormData({
      ...formData,
      workTo: newValue ? newValue.format("YYYY-MM-DDTHH:mm") : "",
    });
  };
  const handleNameChange = (e: SelectChangeEvent<string>) => {
    setFormData({
      ...formData,
      displayName: e.target.value,
    });
  };
  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box className="timesheet-container">
        <Paper className="timesheet-paper">
          <Typography className="timesheet-title" variant="h5" gutterBottom>
            Timesheet Submission
          </Typography>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  variant="outlined"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="form-field"
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label">Your name:</InputLabel>
                  <Select
                    value={formData.displayName}
                    name="Name"
                    onChange={handleNameChange}
                    fullWidth
                    required
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Partner Name"
                  variant="outlined"
                  name="partnerName"
                  value={formData.partnerName}
                  onChange={handleChange}
                  required
                  className="form-field"
                />
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Work From"
                  variant="outlined"
                  name="workFrom"
                  type="datetime-local"
                  value={formData.workFrom}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  className="form-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Work To"
                  variant="outlined"
                  name="workTo"
                  type="datetime-local"
                  value={formData.workTo}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                  className="form-field"
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <MobileDateTimePicker
                  name="workFrom"
                  value={formData.workFrom ? dayjs(formData.workFrom) : null}
                  ampm={false}
                  onChange={handleWorkFromChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      label: "Work From",
                      className: "form-field",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MobileDateTimePicker
                  name="workTo"
                  value={formData.workTo ? dayjs(formData.workTo) : null}
                  ampm={false}
                  onChange={handleWorkToChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      label: "Work To",
                      className: "form-field",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Truck Number"
                  variant="outlined"
                  name="truckNum"
                  value={formData.truckNum}
                  onChange={handleChange}
                  required
                  className="form-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Number of Breaks"
                  variant="outlined"
                  name="breaksCount"
                  type="number"
                  value={formData.breaksCount}
                  onChange={handleChange}
                  required
                  className="form-field"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.hasLunch}
                      onChange={handleChange}
                      name="hasLunch"
                      color="primary"
                    />
                  }
                  label="Has Lunch"
                  className="form-field"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Remarks"
                  variant="outlined"
                  name="remarks"
                  multiline
                  rows={4}
                  value={formData.remarks}
                  onChange={handleChange}
                  className="form-field"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Timesheet"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default TimesheetForm;
