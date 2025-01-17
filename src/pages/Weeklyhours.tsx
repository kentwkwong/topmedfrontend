import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useUser } from "../components/UserContext";

// Define the type for the data you're expecting to fetch
interface WeeklyData {
  week: string;
  hours: number;
}

const Weeklyhours: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]); // State to store fetched data
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading state
  const [error, setError] = useState<string | null>(null); // State to manage error
  const { user } = useUser();
  // Fetch the data when the component mounts
  useEffect(() => {
    const name = user ? user.name : "";
    axios
      .get(
        process.env.REACT_APP_API_URL + "/getweeklytimesheetbyname?name=" + name
      )
      .then((response) => {
        setWeeklyData(response.data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || "An unknown error occurred.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <CircularProgress />
        <Typography variant="h6">Loading data...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </div>
    );
  }

  return (
    <Paper className="timesheet-paper">
      <Typography
        className="timesheet-title"
        variant="h5"
        gutterBottom
        color="common.white"
      >
        Timesheet Weekly Summary
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="Weekly summary">
          <TableHead>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell>Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {weeklyData.map((item) => (
              // <TableRow key={item.id}>
              <TableRow>
                <TableCell>{item.week}</TableCell>
                <TableCell>{item.hours}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Weeklyhours;
