import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useUser } from "../components/UserContext";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      setLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/register",
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
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Typography
          className="timesheet-title"
          variant="h5"
          gutterBottom
          color="common.white"
        >
          Registration
        </Typography>
        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Name"
            variant="filled"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-field"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-field"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            type="password"
            label="Password"
            variant="filled"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="form-field"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Registration;
