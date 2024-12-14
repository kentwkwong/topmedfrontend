import {
  Box,
  Button,
  Container,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useUser } from "../components/UserContext";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/login",
        {
          email,
          password,
        }
      );
      if (!response.data.result) {
        setError(response.data.error);
      } else {
        setUser({ name: response.data.result, email: email });
        navigate("/Info");
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
          Login
        </Typography>
        {error && <div className="alert alert-danger">{error}</div>}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-field"
          />
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Link to="/Registration">
            {" "}
            <button type="button" className="btn btn-dark">
              Register
            </button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
