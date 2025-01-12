// Timesheet.tsx
import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Box,
  Paper,
  FormLabel,
} from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "./Timesheet.css"; // Import the external CSS file
import { useUser } from "../components/UserContext";

// TypeScript interface for form data
interface TimesheetData {
  name: string;
  partner: string;
  truck: string;
  from: string;
  to: string;
  break: number;
  lunch: boolean;
  remarks: string;
}

const TimesheetForm: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useUser();

  const [formData, setFormData] = useState<TimesheetData>({
    name: user ? user.name : "",
    partner: "",
    truck: "",
    from: "",
    to: "",
    break: 0,
    lunch: false,
    remarks: "",
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
      from: newValue ? newValue.format("YYYY-MM-DDTHH:mm") : "",
    });
  };
  const handleWorkToChange = (newValue: Dayjs | null) => {
    setFormData({
      ...formData,
      to: newValue ? newValue.format("YYYY-MM-DDTHH:mm") : "",
    });
  };
  // const handleNameChange = (e: SelectChangeEvent<string>) => {
  //   setFormData({
  //     ...formData,
  //     displayName: e.target.value,
  //   });
  // };
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
        process.env.REACT_APP_API_URL + "/sendtimesheetemail",
        formData
      );
      if (!response.data.result) {
        console.log(response.data);
        setError(response.data.error);
      } else {
        setMessage(response.data.result);
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <center>
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/?size=100&id=19Qs7U6PcAie&format=png&color=000000"
        />
        <FormLabel>Send to your email only</FormLabel>
        <br />
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/?size=100&id=7Tnx21L5k1yA&format=png&color=000000"
        />
        <FormLabel>Not sending to HOURS (Tony)!</FormLabel>
        <br />
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/?size=100&id=63308&format=png&color=000000"
        />
        <FormLabel>
          It will go live (not beta version, directly send to HOURS) in February
          1st
        </FormLabel>
      </center>
      <Box className="timesheet-container">
        <Paper className="timesheet-paper">
          <Typography
            className="timesheet-title"
            variant="h5"
            gutterBottom
            color="common.white"
          >
            Timesheet Submission
          </Typography>
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
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
                {/* <TextField
                    value={formData.displayName}
                    fullWidth
                    slotProps={{ input: { readOnly: true } }}
                    label="Name"
                  /> 
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
                  </Select> */}
                <TextField
                  fullWidth
                  name="partner"
                  label="Partner Name"
                  variant="outlined"
                  value={formData.partner}
                  onChange={handleChange}
                  required
                  className="form-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Truck Number"
                  variant="outlined"
                  name="truck"
                  value={formData.truck}
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
                  name="from"
                  value={formData.from ? dayjs(formData.from) : null}
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
                  name="to"
                  value={formData.to ? dayjs(formData.to) : null}
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
                  label="Number of Breaks"
                  variant="outlined"
                  name="break"
                  type="number"
                  value={formData.break}
                  onChange={handleChange}
                  required
                  className="form-field"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.lunch}
                      onChange={handleChange}
                      name="lunch"
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
