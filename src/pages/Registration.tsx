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
  const backendApi = process.env.REACT_APP_API_URL + "/register";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(formData);
      // fetch(registerApi, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // })
      //   .then((response) => response.json())
      //   .then((data) => console.log(data))
      //   .catch((error) => console.error("Error:", error));

      const response = await axios.post(backendApi, formData);
    } catch (error) {
      console.error(error);
      alert("Registration failed");
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
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Registration;
